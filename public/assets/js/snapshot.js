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

//에러발생시
$(function(){
  $('#error_handle2').click(function(e){
    e.preventDefault();
     $('#error_handle').addClass('display-none')
     location.reload();
  })
})

$(function(){
  $('#error_handle3').click(function(e){
    e.preventDefault();
     $('#error_handle').addClass('display-none')
     location.reload();
  })
})

//datepicker
$(document).ready(function () {
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '',
		showOn: 'both',
    buttonImage: '../assets/img/bg-calendar.png',
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-99:c+99',
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	var today = new Date();
	var beforeday = new Date();
	var today_month = (today.getMonth() + 1);
	var today_day = today.getDate();
  var today_year = today.getFullYear();
  var lastday = ( new Date( today_year, today_month, 0) ).getDate();
	today_month = (today_month < 10) ? "0"+today_month : today_month;
	today_day = (today_day < 10) ? "0"+today_day : today_day;
	var today_date = today.getFullYear() + "-" + today_month + "-" + today_day;

	beforeday.setDate(today.getDate()-7);
	var before_month = (beforeday.getMonth() + 1);
	var before_day = beforeday.getDate();
	before_month = (before_month < 10) ? "0"+before_month : before_month;
	before_day = (before_day < 10) ? "0"+before_day : before_day;
	var before_date = beforeday.getFullYear() + "-" + before_month + "-" + 01;

	$("#api_startdt").val(before_date);
	$("#api_enddt").val(today_date);

	$('#api_startdt').datepicker();
	$('#api_startdt').datepicker("option", "maxDate", $("#api_enddt").val());
	$('#api_startdt').datepicker("option", "onClose", function ( selectedDate ) {
    $("#api_enddt").datepicker( "option", "minDate", selectedDate );
    var stxt = $("#api_startdt").val().split("-");
    if(stxt[1]==today_month){
    	var setdate = today.getFullYear() + "-" + today_month + "-" + today_day;
        $("#api_enddt").val(setdate)
    }else{
      var fsetdate = (new Date(stxt[0], stxt[1], 0)).getDate();
      var setdate = stxt[0] + "-" + stxt[1] + "-" + fsetdate
          $("#api_enddt").val(setdate)

    }
  });

	$('#api_enddt').datepicker();
	$('#api_enddt').datepicker("option", "minDate", $("#api_startdt").val());
	$('#api_enddt').datepicker("option", "beforeShow", function () {
		var stxt = $("#api_startdt").val().split("-");
    console.log("today_month"+today_month)
    if(stxt[1]==today_month){
        $("#api_enddt").datepicker( "option", "maxDate", today )
    }else{
      var mdate = new Date(stxt[0], stxt[1], 0);
      $("#api_enddt").datepicker( "option", "maxDate", mdate );
    }
	});
	$('#api_enddt').datepicker("option", "onClose", function ( selectedDate ) {
		$("#api_startdt").datepicker( "option", "maxDate", selectedDate );
	});

  $("#ss_startdt").val(before_date);
  $("#ss_enddt").val(today_date);

  $('#ss_startdt').datepicker();
  $('#ss_startdt').datepicker("option", "maxDate", $("#ss_enddt").val());
  $('#ss_startdt').datepicker("option", "onClose", function ( selectedDate ) {
    $("#ss_enddt").datepicker( "option", "minDate", selectedDate );
    var stxt = $("#ss_startdt").val().split("-");
    if(stxt[1]==today_month){
    	var setdate = today.getFullYear() + "-" + today_month + "-" + today_day;
        $("#ss_enddt").val(setdate)
    }else{
      var fsetdate = (new Date(stxt[0], stxt[1], 0)).getDate();
      var setdate = stxt[0] + "-" + stxt[1] + "-" + fsetdate
          $("#ss_enddt").val(setdate)

    }
  });

  $('#ss_enddt').datepicker();
  $('#ss_enddt').datepicker("option", "minDate", $("#ss_startdt").val());
  $('#ss_enddt').datepicker("option", "beforeShow", function () {
    var stxt = $("#ss_startdt").val().split("-");
    if(stxt[1]==today_month){
        $("#ss_enddt").datepicker( "option", "maxDate", today )
    }else{
      var mdate = new Date(stxt[0], stxt[1], 0);
      $("#ss_enddt").datepicker( "option", "maxDate", mdate );
    }
  });
  $('#ss_enddt').datepicker("option", "onClose", function ( selectedDate ) {
    $("#ss_startdt").datepicker( "option", "maxDate", selectedDate );
  });
});


//api 조회
$(function(){
	$("#api_count_search").click(function(e){
    e.preventDefault();
		var sdt = $("#api_startdt").val()
		var edt = $("#api_enddt").val()
    if(sdt == ''){
      $('#error_handle').removeClass('display-none')
        return false;
    }else if(edt == ''){
      $('#error_handle').removeClass('display-none')
        return false;
    }

		$('#api_summary_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/api_summary_count",
					type : "GET",
          data : data,
					success: function(data){
  						 $('#'+data.tdid).html(comma(data.count))
               if ( data.error )
               {
                   $('#error_handle').removeClass('display-none')
                   $('#'+data.tdid).html("")
                   $('.api_create_total_success_ratio').html("")
                   $('.api_create_total_fail_ratio').html("")
                   $('.api_result_total_success_ratio').html("")
                   $('.api_result_total_fail_ratio').html("")
                   $('.api_delete_total_success_ratio').html("")
                   $('.api_delete_total_fail_ratio').html("")
              }
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

			})
		}})
		$('#api_error_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/api_error_count",
					type : "GET",
					data : data,
					success: function(data){
						     $('#'+data.tdid).html(comma(data.count))
                 if ( data.error )
                 {
                     $('#'+data.tdid).html("")
                }
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
      if(sdt == ''){
        $('#error_handle').removeClass('display-none')
          return false;
      }else if(edt == ''){
        $('#error_handle').removeClass('display-none')
          return false;
      }

		$('#ss_summary_count').find('td').each(function(i,e){
			var data = { startdt : sdt , enddt : edt, tdid : $(this).attr('id')	}
			if($(this).attr('id')){
				$.ajax({
					url : "http://localhost:3005/ss_summary_count",
					type : "GET",
					data : data,
					success: function(data){
              $('#'+data.tdid).html(comma(data.count))
              if ( data.error )
              {
                  $('#error_handle').removeClass('display-none')
                  $('#'+data.tdid).html("")
                  $('.ss_create_total_success_ratio').html("")
                  $('.ss_create_total_fail_ratio').html("")
                  $('.ss_delete_total_success_ratio').html("")
                  $('.ss_delete_total_fail_ratio').html("")
             }
					}
          , beforeSend: function(){
             $('#loading').removeClass('display-none')
          }
          , complete:function(){
            //추후 삭제로그 추가 예정
            var cnt1 = uncomma($('#ss_create_total_cnt').html())
            var cnt2 = uncomma($('#ss_create_total_success_cnt').html())
            var cnt3 = uncomma($('#ss_create_total_fail_cnt').html())
            if ( cnt1 != null && cnt2 != null && cnt3 != null )
                {
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
					data : data,
					success: function(data){
            $('#'+data.tdid).html(comma(data.count))
            if ( data.error )
            {
                $('#'+data.tdid).html("")
           }
					}
				})
			}
		})

	})
})
