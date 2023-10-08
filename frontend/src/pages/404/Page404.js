import React from "react";

export default function Page404() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 className="align-content-center">Page Not Found!</h2>
      <img
        src={
          "https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1868.jpg?w=826&t=st=1696756748~exp=1696757348~hmac=3605be362e88cb5538cd2c5d2710f6e770e4893e47726bded7aff75ddea6132c"
        }
        alt="404-Page Not Found"
        style={{ margin: "20px auto" }}
      />
    </div>
  );
}
