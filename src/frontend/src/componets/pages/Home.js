const handleClick = (e) =>{
  fetch('http://127.0.0.1:8000/api/blog/', {method:'get'})
  .then(response => response.json())
  .then((data)=> {
    console.log(data)
  })
}

function Home() {
  return (
    <>
      <h1>Hello World!</h1>
      <button onClick = {(e)=>handleClick(e)}>Press</button>
    </>
  );
}

export default Home;
