function Content() {
  return (
    <div className=" grid md:grid-cols-4 grid-cols-1 gap-10 p-5 pt-9">
      <div className="moviecard w-full m-2">
        <div className="bgm w-full" style={{backgroundImage: `url("https://res.cloudinary.com/dqrpxoouq/image/upload/v1693052168/xpp7yebceatorhbvebwc.jpg")`,backgroundSize: "300px 200px", backgroundPosition : "center"}}>
            <h1 className="md:text-2xl text-lg font-bold my-3 text-white">Jurasic World</h1>
            
        </div>
        <div className="blob w-full">fsdfdf</div>
      </div>
      <div className="moviecard m-2 w-full">
        <div className="bgm w-full"></div>
        <div className="blob w-full"></div>
      </div>
    </div>
    
  );
}

export default Content;
