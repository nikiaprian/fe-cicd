import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { useForumStore, useBlogStore } from "../store/ProductStore";
import axios from "axios";
import Swal from "sweetalert2";
function DeleteContent(props) {
  const [state, setState] = useState({});
  let key = window.localStorage.getItem("ACCESS_KEY");
  const forumsId = useForumStore((state) => state.forumId);
  const blogId = useBlogStore((state) => state.blogId);
  const navigate = useNavigate();
  let idUser = window.localStorage.getItem("idUser");

  useEffect(() => {
    if (props?.type === "deleteForum") {
      setState(forumsId);
    } else if (props?.type === "deleteBlog") {
      setState(blogId);
    }
    //eslint-disable-next-line
  }, [forumsId, blogId]);

  const handleDelete = async () => {
    if (props.type === "deleteForum" && state?.user?.id === +idUser) {
      await axios
        .delete(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/forums/${state?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        })
        .then((res) => {
          Swal.fire("Berhasil!", "Anda Telah Berhasil Menghapus!", "success");
          navigate("/forum");
        })
        .catch((error) => {
          Swal.fire({
            title: "Gagal!",
            text: "Gagal Menghapus!",
            icon: "error",
            confirmButtonText: "ya, saya mencoba kembali",
          });
        });
    } else if (props?.type === "deleteBlog" && state?.user?.id === +idUser) {
      await axios
        .delete(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/blogs/${state?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        })
        .then((res) => {
          Swal.fire("Berhasil!", "Anda Telah Berhasil Menghapus!", "success");
          navigate("/blog");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Gagal!",
            text: "Gagal Menghapus!",
            icon: "error",
            confirmButtonText: "ya, saya mencoba kembali",
          });
        });
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">{state?.user?.id === +idUser ? <TrashIcon className="h-6 w-6 text-red-600 cursor-pointer" onClick={key && handleDelete} /> : null}</div>
    </>
  );
}

export default DeleteContent;