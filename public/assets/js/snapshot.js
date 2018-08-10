$(function(){
  $(".accordion .btn-block > button[data-toggle='collapse']").on('click',function(e){
    $(this).find('span').toggleClass('plus minus');
		var cont = $(this).parent().next();
		cont.slideToggle("300");
})
})

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

$(function(){
	$("#api_count_search").click(function(e){
		e.preventDefault();
		var sdt = $("#api_startdt").val()
		var edt = $("#api_enddt").val()
		$('#api_summary_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/api_summary_count",
					type : "GET",
          dataType : "jsonp",
					data : data,
					success: function(data){
  						 $('#'+data.tdid).html(comma(data.count))
					}
          , beforeSend: function(){
             $('#loading').removeClass('display-none')
          }
          , complete:function(){
            var cnt1 = uncomma($('#api_create_total_cnt').html())
            var cnt2 = uncomma($('#api_create_total_success_cnt').html())
            var cnt3 = uncomma($('#api_create_total_fail_cnt').html())
            var cnt4 = uncomma($('#api_result_total_cnt').html())
            var cnt5 = uncomma($('#api_result_total_success_cnt').html())
            var cnt6 = uncomma($('#api_result_total_fail_cnt').html())
            var cnt7 = uncomma($('#api_delete_total_cnt').html())
            var cnt8 = uncomma($('#api_delete_total_success_cnt').html())
            var cnt9 = uncomma($('#api_delete_total_fail_cnt').html())
              if ( cnt1 != null && cnt2 != null && cnt3 != null && cnt4 != null &&
                cnt5 != null && cnt6 != null && cnt7 != null && cnt8 != null && cnt9 != null ){

                  if ( cnt1 != 0 ){
                    var result1 = cnt2 / cnt1 * 100
                    var result2 = cnt3 / cnt1 * 100
                    $('.api_create_total_success_ratio').html(result1.toFixed(2)+'%')
                    $('.api_create_total_fail_ratio').html(result2.toFixed(2)+'%')
                  }
                  if ( cnt4 != 0 ){
                    var result1 = cnt5 / cnt4 * 100
                    var result2 = cnt6 / cnt4 * 100
                    $('.api_result_total_success_ratio').html(result1.toFixed(2)+'%')
                    $('.api_result_total_fail_ratio').html(result2.toFixed(2)+'%')
                  }
                  if ( cnt7 != 0 ){
                    var result1 = cnt8 / cnt7 * 100
                    var result2 = cnt9 / cnt7 * 100
                    $('.api_delete_total_success_ratio').html(result1.toFixed(2)+'%')
                    $('.api_delete_total_fail_ratio').html(result2.toFixed(2)+'%')
                  }
            $('#loading').addClass('display-none')
            }
				}
         , error:function(data){
           var error = "<div class='layers' style='display: block;'><div class='inners size-lg'><div class='layer-head'>에러</div><div class='layer-contents'><div class='message-area warning'><div class='message'><span class='icon'><i class='fa fa-exclamation-triangle'></i></span><p>{작업 명} 처리 중 오류가 발생하였습니다.</p><span class='dec'>{에러 메시지}({에러코드})</span></div></div></div><div class='layer-footer'><button type='button' class='btn size-lg bg-bombay'>확인</button></div><div class='layer-close'><button type='button' class='btn actions close'><span class='invisible'>Close</span></button></div></div></div>"
            $('.container').append(error)
        }
			})
		}})
		$('#api_error_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/api_error_count",
					type : "GET",
          dataType : "jsonp",
					data : data,
					success: function(data){
						     $('#'+data.tdid).html(comma(data.count))
					}
        })
			}
		})
	})
})



$(function(){
	$("#ss_count_search").click(function(e){
		e.preventDefault();
		var sdt = $("#ss_startdt").val()
		var edt = $("#ss_enddt").val()
		$('#ss_summary_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/ss_summary_count",
					type : "GET",
          dataType : "jsonp",
					data : data,
					success: function(data){
                          console.log("data"+JSON.stringify(data))
										 		$('#'+data.tdid).html(comma(data.count))
					}
          , beforeSend: function(){
             $('#loading').removeClass('display-none')
          }
          , complete:function(){
            if ( $('#ss_create_total_cnt') != null &&
                 $('#ss_create_total_success_cnt').html() != null &&
                 $('#ss_create_total_fail_cnt').html() != null )
                {
                   var cnt1 = uncomma($('#ss_create_total_cnt').html())
                   var cnt2 = uncomma($('#ss_create_total_success_cnt').html())
                   var cnt3 = uncomma($('#ss_create_total_fail_cnt').html())
                       if (cnt1 != 0){
                       var result1 = uncomma(cnt2) / cnt1 *100
                       var result2 = cnt3 / cnt1 *100
                       $('.ss_create_total_success_ratio').html(result1.toFixed(2)+'%')
                       $('.ss_create_total_fail_ratio').html(result2.toFixed(2)+'%')
                       }
            $('#loading').addClass('display-none')
          }
          }
				})
			}
		})


		$('#ss_error_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/ss_error_count",
					type : "GET",
          dataType : "jsonp",
					data : data,
					success: function(data){
              console.log("data"+JSON.stringify(data))
										 		$('#'+data.tdid).html(comma(data.count))
					}
				})
			}
		})

	})
})
