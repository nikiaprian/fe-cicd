import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const storeBlog = (set) => ({
  blogs: null || [],
  blogId: null || {},
  comments: null || [],
  fetchBlogs: async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    set({ blogs: await response.data.data });
  },

  fetchBlogId: async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    set({ blogId: await response.data.data });
  },
  changeBlog: (data) =>
    set((state) => {
      if (state.blogs === null) {
        set({ blogs: [data] });
      } else {
        set({ blogs: [...state.blogs, data] });
      }
    }),

  fetchSetComment: async (id) => {
    await axios
      .get(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        set((state) => {
          state.setComment(res?.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  fetchCommentInput: async (id, data, token) => {
    await axios
      .post(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/comments/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set((state) => {
          state.changeComment(res?.data?.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  setComment: (data) => set((state) => ({ comments: data.data })),
  changeComment: (data) =>
    set((state) => {
      if (state.comments === null) {
        set({ comments: [data] });
      } else {
        set({ comments: [...state.comments, data] });
      }
    }),
});

const useBlogStore = create(devtools(storeBlog));

const storeForum = (set) => ({
  forums: null || [],
  forumId: null || {},
  answers: null || [],
  fetchForums: async (token) => {
    await axios
      .get("http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/forums", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set({ forums: res.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  fetchForumId: async (url, token) => {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    set({ forumId: await response.data.data });
  },

  fetchsetAnswer: async (id, key) => {
    await axios
      .get(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/commentsforum/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      })
      .then((res) => {
        set((state) => {
          state.setAnswer(res?.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  fetchAnswerInput: async (id, data, token) => {
    await axios
      .post(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/commentsforum/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set((state) => {
          state.changeAnswer(res?.data?.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setAnswer: (data) => set((state) => ({ answers: data.data })),
  changeAnswer: (data) =>
    set((state) => {
      if (state.answers === null) {
        set({ answers: [data] });
      } else {
        set({ answers: [...state.answers, data] });
      }
    }),
});
const useForumStore = create(devtools(storeForum));

export { useBlogStore, useForumStore };
