"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserById } from "./user";

export const findposts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        postLikes: {
          include: {
            user: { // Inclui o usuário que deu like
              select: {
                username: true,
                profileImageUrl : true,
                savedPosts : true,
              },
            },
          },
        },
        savedByUsers : {
          include : {
            user : {
              select : { 
                id : true,
              }
            }
          }
        },
        author: { // Inclui o autor do post
          select: {
            name : true,
            username: true,
            profileImageUrl : true,
            id : true,
          },
        },
        coments: { // Inclui os comentários do post
          include: {
            // Inclui o usuário que fez o comentário
            // Isso assume que você já adicionou a relação no modelo User, como discutido anteriormente.
            user: { 
              select: {
                name : true,
                username: true,
                profileImageUrl : true,
                savedPosts : true,
              },
            },
          },
        },
        _count: {
          select: {
            coments: true,
            postLikes: true, // Conta a quantidade de likes
          },
        },
      },
      orderBy : {
        updated_at : 'desc',
      }
    });     

    return { posts, error: null };

  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};

export const findpost = async (
  post_id : number
) => {
  try {
   
    const post = await db.post.findUnique({
      where: {
        id: post_id, // Ou pode ser baseado no slug, dependendo da estrutura do seu schema
      },
      include: {
        postLikes: {
          include: {
            user: { // Inclui o usuário que deu like
              select: {
                name : true,
                username: true,
                profileImageUrl : true,
              },
            },
          },
          orderBy : {
            postId : 'desc',
          }
        },
        author: { // Inclui o autor do post
          select: {
            name : true,
            username: true,
            profileImageUrl : true,
          },
        },
        coments: { // Inclui os comentários do post
          include: {
            // Inclui o usuário que fez o comentário
            // Isso assume que você já adicionou a relação no modelo User, como discutido anteriormente.
            user: { 
              select: {
                name : true,
                username: true,
                profileImageUrl : true,
              },
            },
          },
        },
        _count: {
          select: {
            coments: true,
            postLikes: true, // Conta a quantidade de likes
          },
        },
      },
    });
    
    const postconvertedToArray = post ? [post] : [];    

    return { postconvertedToArray, error: null };

  } catch (error) {
    return { success: null, error: "Erro ao atualizar as informações." };
  }
};