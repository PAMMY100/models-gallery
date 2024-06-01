
import Item from "../components/Items/Item"
import products from "../components/ui/products"
import './Css/Gallery.css'
export default function Gallery () {

  return (
    <div className='gallery-products'>
      {
        products.map(data => 
        <Item
          key={data.id}
          id={data.id}
          img={data.img}
          category={data.category}
          price={data.price}
        />)
      }
    </div>
  )
}