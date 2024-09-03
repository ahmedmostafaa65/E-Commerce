import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react';
const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: 'women',
    image: ''
  })

  const image_handler = (e)=>{
    setImage(e.target.files[0])
  }
  const change_handler = (e)=>{
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const add_product = async ()=>{
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image)

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers: {
        Accept: 'Application/json',
      },
      body: formData,
    }).then((res)=>res.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image = responseData.image_url;
      await fetch('http://localhost:4000/addproduct',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((res)=>res.json()).then((data)=>{
        data.success?alert('Product Added'):alert('Failed')
      })   
    }
  }

  return(
    <div className="addProduct">
      <div className="addProduct-itemField">
        <p>Product Title</p>
        <input type="text" value={productDetails.name} onChange={change_handler} name='name' placeholder='Type Here'/>
      </div>
      <div className="addProduct-price">
        <div className="addProduct-itemField">
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={change_handler} name='old_price' placeholder='Type Here' />
        </div>
        <div className="addProduct-itemField">
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={change_handler} name='new_price' placeholder='Type Here' />
        </div>
      </div>
      <div className="addProduct-itemField">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={change_handler} className='addProduct-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addProduct-itemField">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addProduct-thumnail-img' alt="upload_area" />
        </label>
        <input type="file" name="image" id="file-input" onChange={image_handler} hidden />
      </div>
      <button onClick={()=>{add_product()}} className="addProduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
