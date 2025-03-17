// import MyData from "./MyData";


// // function App(){
// //   return(
// //     <>
// //     { <h1>Hello world</h1> }
// //     { <MyData name = 'Uldana'/> 
// //     <MyData  year = '16' /> 
// //     <MyData  location = "ALmaty" /> 
// //     <MyData img = 'https://avatars.mds.yandex.net/i?id=596b8893ef6af47214aef92e47cfb6443a1e02d8-5673334-images-thumbs&n=13'/>  
// //     }


// // { 
// //     <MyData 
// //     name = "pineapple"
// //     image = 'https://media.komus.ru/medias/sys_master/root/h95/h30/12203364188190/2010266-1-800Wx800H.jpg'
// //     price = '3000T'
// //     /> 

// //   <MyData 
// //     name = "bag"
// //     image = 'https://avatars.mds.yandex.net/i?id=129618436cf2395061f3053c04d71cbd_l-5221583-images-thumbs&n=13'
// //     price = '300 000T'
// //     /> 

// //   <MyData 
// //     name = "iphone 16 pro max"
// //     image = 'https://frankfurt.apollo.olxcdn.com/v1/files/x5oavnajkjp71-KZ/image'
// //     price = '700 000T'
// //     />  }

// //     </>
// //   )
// // }

// function UserList() {
//   const users = [
//     {name: 'uldana' , age: '16' , email:'abdiumar@list.ru'},
//     {name: 'Aiganym' , age: '14' , email:'gflikjhgfd@list.ru'},
//     {name: 'beibarys' , age: '14' , email:'ikujyhtgrfds@list.ru'},
//     {name: 'baxa' , age: '13' , email:'utrelkjhb@list.ru'}

//   ]

//   return (
//     <div>
//       <h1>Paidalanyshyar tizimi</h1>
//       {users.map((user, index ) => (
//         <UserCard key= {index} name = {user.name} />
//       ))}
//     </div>
//   )
// }

// export default UserList;



import { useState } from "react";

export default function UserCard({ role, isPremium, temperature }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const roleText =
    role === "admin" ? "Админ" : role === "user" ? "Қолданушы" : "Қонақ";

  const tempText =
    temperature > 40
      ? "Өте ыстық"
      : temperature >= 30
      ? "Ыстық"
      : temperature >= 15
      ? "Жылы" 
      : temperature >= 0
      ? "Суық"
      : "Өте суық";

  const tempColor =
    temperature > 40
      ? "text-red-600"
      : temperature >= 30
      ? "text-orange-600"
      : temperature >= 15
      ? "text-yellow-600"
      : temperature >= 0
      ? "text-cyan-600"
      : "text-blue-600";

  const bgColor = isPremium ? "bg-yellow-200" : "bg-gray-200";

  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>
      <p className="text-lg font-semibold text-blue-600">{roleText}</p>
      <p className={`text-lg font-semibold ${tempColor}`}>{tempText}</p>
      <button
        onClick={() => setIsSubscribed(!isSubscribed)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        {isSubscribed ? "Жазылымнан бас тарту" : "Жазылу"}
      </button>
    </div>
  );
}




// function Home({ user, setUser, setPage }) {
//   const handleLogout = () => {
//     setUser(null);
//     setPage("login"); // Шыққаннан кейін Login бетіне ауысу
//   };

//   const handleDeleteAccount = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     alert("Аккаунт жойылды!");
//     setPage("register"); // Аккаунт жойылғаннан кейін қайта тіркелуге жібереді
//   };

//   return (
//     <div>
//       <h2>Сәлем, {user.name}!</h2>
//       <button onClick={handleLogout}>Шығу</button>
//       <button onClick={handleDeleteAccount}>Аккаунтты жою</button>
//     </div>
//   );
// }

// export default App;