import './MyData.css'


function MyData(props) {

    return(
        // <div className='myDiv'>
        //     <img src="props.img" alt="" />
        // <h1> Hello My name is {props.name } </h1>
        // <h1>, age: {props.year} </h1>
        // <h1>My location {props.location}</h1>
        // </div>

        <div className='product'>
            <img src= {props.image} alt="" />
            <h2>{props.name}</h2>
            <p>price: {props.price} </p>
        </div>
    )
}

export default MyData;