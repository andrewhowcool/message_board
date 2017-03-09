$(document).ready(function() {
    var post_name;
    var post_content;
    var comment_name;
    var comment_content;
    var comment_block = '<div class="comment_block" id="{{i}}"><div class="pic" id="pic_test"><img src="1.jpg"></div><h5 class="comment_block_name">{{name}}</h5><p class="comment_block_content">{{reply}}</p> <h6 class="reply_button"id="{{reply_id}}" reply_parent="{{test}}">reply</h6> <h6 class="delete" id="{{parent_id}}" parent="{{parent_name}}">X</h6></div>'
    var reply_input = '<div class="reply_input" id="{{reply_input_id}}"><input placeholder="Name" class="reply_input_name" id="{{reply_input_id}}"></input><input placeholder="What is your reply?" class="reply_input_content" id="{{reply_input_id}}"></input></div>'
    var reply_block = '<div class="reply_block {{reply_class_block}}" id="{{reply_block_id}}"><div class="pic"><img src="1.jpg"></div><h5 class="reply_block_name">{{name}}</h5><p class="reply_content">{{content}}</p><h6 class="delete_reply" id="{{delete_reply_id}}" delete_id="{{delete_id}}">X</h6></div>'
    var comment_block_id = 0;
    var delete_reply_id = 0;

    //po文
    $(".post_button").click(function(event) {

        var comment = '<div class="comment"><div class="display"><div class="pic" id="pic_test2"><img src="1.jpg"></div><h4 class="name_post_display"></h4><p class="content_post_display"></p></div><div class="comment_box"></div><div class="comment_input"><input type="text" placeholder="Name" class="comment_name"><input type="text" placeholder="What is your comment?" class="comment_content"></div></div>'
          // <div class="comment">
          //   <div class="display">
          //     <h4 class="name_post_display"></h4>
          //     <p class="content_post_display"></p>
          //   </div>
            
          //   <div class="comment_box"></div>

          //   <div class="comment_input">
          //     <input type="text" placeholder="Name" class="comment_name">
          //     <input type="text" placeholder="What's your comment?" class="comment_content">
          //   </div>       
        $(".post").append(comment);//新增貼文

        post_name = $(".post_name").val();
        post_content = $(".post_content").val();
        $(".name_post_display").text(post_name);
        $(".content_post_display").text(post_content);     

        $(".content").remove();//移除post的content
        $(".nameANDpost").remove();//移除post的nameANDpost

        
        //輸入回覆
        $(".comment_content").keypress(function(event) {
            
            if (event.keyCode == 13) {//enter鍵
                comment_name = $(".comment_name").val();
                comment_content = $(".comment_content").val();

                //comment_block
                var current_comment_block = comment_block.replace("{{name}}", comment_name)
                    .replace("{{test}}", comment_name)
                    .replace("{{reply}}", comment_content)
                    .replace("{{i}}", comment_block_id + 'x')
                    .replace("{{parent_id}}", comment_block_id)
                    .replace("{{parent_name}}", comment_name)
                    .replace("{{reply_id}}", comment_block_id + 'r');

                //加入block
                $(".comment_box").prepend(current_comment_block);

                //清空input
                $(".comment_name").val('');
                $(".comment_content").val('');

                //id + 1
                comment_block_id += 1;

                //指派id
                var current_reply_input_id = comment_block_id + 'ri';
                var current_reply_input = reply_input.replace("{{reply_input_id}}", current_reply_input_id)
                	.replace("{{name_reply_id}}", current_reply_input_id + 'n')
                    .replace("{{reply_input_id}}", current_reply_input_id + 't');

                //input reply
                var current_reply_id = $(".reply_button").attr('id');
                $("#" + current_reply_id).click(function(event) { 
                    var reply_parent = $(this).attr('reply_parent'); 


                        $('#' + current_comment_block).after(current_reply_input);

                        //display reply
                        $(".reply_input_content").keypress(function(event) {
                            if (event.keyCode == 13) {
                                console.log("enter press");
                                var reply_content = $(".reply_input_content").val();
                                var reply_input_name = $(".reply_input_name").val();
                                var current_reply_block = reply_block.replace("{{name}}", reply_input_name)
                                    .replace("{{content}}", reply_content)
                                    .replace("{{reply_block_id}}", comment_block_id + 'xr')
                                    .replace("{{delete_id}}", comment_block_id + 'xr')
                                    .replace("{{reply_class_block}}", reply_parent)
                                    .replace("{{delete_reply_id}}", 'cancel_reply_' + delete_reply_id);

                                $('#' + current_reply_input_id).after(current_reply_block);//display replay
                                
                                
                                //delete reply input
                                $('#' + current_reply_input_id).remove();

                                //delete reply                         
                                $('#' + 'cancel_reply_' + delete_reply_id).click(function(event) {
                                    var delete_id = $(this).attr("delete_id");
                                    console.log(delete_id);
                                    $('#' + delete_id).remove();
                                });
                                comment_block_id += 1;
                                delete_reply_id += 1;

                            }
                        });
                });

                //delete comment block and reply
                var current_id = $(".delete").attr('id');
                var current_comment_block = current_id + 'x';

                $("#" + current_id).click(function(event) {
                    $('#' + current_comment_block).remove();
                    $('#' + current_reply_input_id).remove();
                        
                    var parent = $(this).attr('parent');
                    $("." + parent).remove();
                });                
            }
        });
    });
});