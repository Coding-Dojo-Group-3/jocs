// import {useState, useEffect} from 'react';
// import {useParams, useNavigate,Link} from'react-router-dom';
// import axios from 'axios';


// const OneProduct = () => {
//     const {id} =useParams()
//     const [data,setData] = useState('')
//     const options = {
//         method: 'GET',
//         url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
//         withCredentials:true,
//         params: {limit: '1',id:id},
//         headers: {
//             'X-RapidAPI-Key':"",
//             'X-RapidAPI-Host': ''
//         }
//     };
//     const getOneProduct = async ()=>{
//         await axios.request(options)
//             .then(function (response) {
//                 console.log('Product Results from One Product',response.data.results);
//                 setData(response.data.results)
//             })      
//             .catch(function (error) {
//                 console.log(error);
//             });
//         }

//     useEffect(() =>{
//         getOneProduct()
       
//         },[])
    
      
//     return (
//     <div>OneProduct
//         <p>{data.brand}</p>
//         <img className="rounded-t-md h-26 w-52 " 
//         src={data.image} alt='/'/>






//     </div>
    
//   )
// }

// export default OneProduct
