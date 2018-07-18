angular.module('ss').directive('ssHeader',function(){
  return {

    template : 	'<div class="inhead">'+
  	'<h1>'+
  			'<a ng-click="statusFilter={displayFG:false}"><span class="invisible">CLOUDZ CONSOLE</span></a>'+
  	'</h1>'+
  	'</div>'+
  '<nav>'+
  		'<ul class="gnb">'+
  			'<li><a ng-click="statusFilter={displayFG:true}"><span>메인</span></a></li>'+
  			'<li><a href="trigger.html"><span>트리거 설정</span></a></li>'+
  			'<li><a href="monitoring.html"><span>모니터링</span></a></li>'+
  			'<li><a href="admin.skcc.com/5601"><span> 리포팅</span></a></li>'+
  			'</ul>'+
  	'</nav>'
}
})


angular.module('ss').directive('ssUtils',function(){
  return {

    template : 			'<div class="utils">'+
    			'<div class="reverse">'+
    			'</div>'+
    		'</div>'
}
})

angular.module('ss').directive('ssLocationsarea',function(){
  return {

    template :				'<div class="locations-area">'+
    							'<div class="breadscrumb">'+
    						'<a href="index.html">메인</a>'+
    					'</div>'+
    				'</div>'
}
})

angular.module('ss').directive('ssMain',function(){
  return {

    template :								'<div class="top-area">'+
    								'<h2 class="title">Snapshot</h2>'+
    								'<p>본 화면은 11번가 화면 캡처 저장 SaaS 운영을 위한 화면입니다. </p>'+
    							'</div>'+
    							'<div class="tabs">'+
    							'<ul class="tabType1">'+
    								'<li><a href="#tabs1-1" class="tab-triggers active"><span>서버목록</span></a></li>'+
    							'</ul>'+
    							'<div id="tabs1-1" class="tab-contents active">'+
                        '<!--  accordion  -->'+
                        '<div class="accordion">'+
                            '<div class="accordion-content">'+
                                '<table class="type-vertical">'+
                                        '<colgroup>'+
                                            '<col style="width:33%">'+
                                            '<col style="width:33%">'+
    																				'<col style="width:33%">'+
                                        '</colgroup>'+
                                        '<thead>'+
                                            '<tr>'+
    																					'<th><a href="#">IP <i class="fa fa-angle-down" aria-hidden="true"></i></a></th>'+
    																					'<th><a href="#">Hostname<i class="fa fa-angle-down" aria-hidden="true"></i></a></th>'+
    																					'<th><a href="#">API재기동<i class="fa fa-angle-down" aria-hidden="true"></i></a></th>'+
                                            '</tr>'+
                                        '</thead>'+
    																		'<tbody>'+
    																				'<tr>'+
    																						'<td>123.123.12.144</td>'+
    																						'<td>admin</td>'+
    																						'<td><button type="button" class="btn size-xs bg-bombay">재기동</button></td>'+
    																						'<td> 	</td>'+
    																				'</tr>'+
    																		'</tbody>'+
                                    '</table>'+
                                '</div>'+
                            '</div>'+
                            '<!--  //accordion  -->'+
                        '</div>'+
    								'</div>'
}
})



angular.module('ss').directive('ssFooter',function(){
  return {

    template :	'<div class="footer">'+
    	'COPYRIGHTⓒ2018 BY SK HOLDINGS CO., LTD. ALL RIGHT RESERVED'+
    '</div>'
}
})
