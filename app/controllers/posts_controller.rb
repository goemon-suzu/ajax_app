class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content])
    render json:{ post: post }  #json:の部分をjsonオプションといい、直後に記述した{ post: post }というデータをJSON形式で返却することができます
  end

end
