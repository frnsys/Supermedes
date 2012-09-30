//
// CANVAS LAB 1.0 by Francis Tseng (www.yadonchow.com)
//
	//default/initialized values
	var	rval = 0;
	var bval = 0;
	var gval = 0;
	var orgx = 100;
	var orgy = 185;
	var sides = 3;
	var sideCoords;
	var orgcurve = 0;
	var org1x = 100;
	var org1y = 100;
	var org2x = 200;
	var org2y = 200;
	var gridscale = 10;

	//generate a two-dim array of side line coordinates	
	function gensidecoordarray(numsides) {
		sideCoords = new Array();
		i = 0;
		for (i=0; i < numsides; i++) {
			sideCoords[i] = new Array(7);
			sideCoords[i][0] = (i*10)+50; //default x-coord
			sideCoords[i][1] = (i*10)+50; //default y-coord
			sideCoords[i][2] = 0; //default type value (side=0,curve=1)
			sideCoords[i][3] = sideCoords[i][0] - 50; //cp1x
			sideCoords[i][4] = sideCoords[i][1] - 50; //cp1y
			sideCoords[i][5] = sideCoords[i][0] + 50; //cp2x
			sideCoords[i][6] = sideCoords[i][1] + 50; //cp2y
		}
		return sideCoords;
	}

	//sets the side line coordinates in the generated array
	function setsidecoord(sidenum,sidex,sidey,sidearray) {
			sidearray[sidenum][0] = sidex;
			sidearray[sidenum][1] = sidey;
	}

	//sets curve coordinates in the generated array
	function setcurvecoord(sidenum,cp1x,cp1y,cp2x,cp2y,sidearray) {
		sidearray[sidenum][3] = cp1x;
		sidearray[sidenum][4] = cp1y;
		sidearray[sidenum][5] = cp2x;
		sidearray[sidenum][6] = cp2y;
	}

	function cleargrid() {
		var thegrid = document.getElementById('grid');
		if (thegrid.getContext){
			var grid_ctx = thegrid.getContext('2d');
			//clear canvas
			grid_ctx.setTransform(1, 0, 0, 1, 0, 0);
			grid_ctx.clearRect(0, 0, thegrid.width, thegrid.height);
		}
	}

	//generate grid
	function gengrid(gridscale) {
		cleargrid();
		canvaswidth = $('#canvas').attr('width');
		canvasheight = $('#canvas').attr('height');
		var thegrid = document.getElementById('grid');

		if (thegrid.getContext){
			var grid_ctx = thegrid.getContext('2d');

			// Retina wizardry!
			if ( window.devicePixelRatio ) {
				var el = $('#grid');
				var elWidth = $('#canvas').width();
				var elHeight = $('#canvas').height();
				el.attr('width', elWidth * window.devicePixelRatio);
				el.attr('height', elHeight * window.devicePixelRatio);
				el.css('width', elWidth);
				el.css('height', elHeight);
				grid_ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}

			//clear canvas
			grid_ctx.setTransform(1, 0, 0, 1, 0, 0);
			grid_ctx.clearRect(0, 0, thegrid.width, thegrid.height);
			grid_ctx.beginPath();			
			//generate vertical lines
			for (i=gridscale; i<canvaswidth; i+=gridscale) {
				grid_ctx.moveTo(i+0.5,0);
				grid_ctx.lineTo(i+0.5,canvasheight);
				grid_ctx.strokeStyle="#eee";
				grid_ctx.stroke();
			}
			//generate horizontal lines
			for (i=gridscale; i<canvasheight; i+=gridscale) {
				grid_ctx.moveTo(0,i+0.5);
				grid_ctx.lineTo(canvaswidth,i+0.5);
				grid_ctx.strokeStyle="#eee";
				grid_ctx.stroke();
			}
			grid_ctx.closePath();
		}
	}

	//shows points and their numbers
	function showpoints(numsides,sidearray,originx,originy) {
			
			i = 0;
			for (i=0;i<numsides;i++) {
				var xcoord = sidearray[i][0];
				var ycoord = sidearray[i][1];
				cp1x = sidearray[i][3];
				cp1y = sidearray[i][4];
				cp2x = sidearray[i][5];
				cp2y = sidearray[i][6];
				//draw the points
				var canvas = document.getElementById('canvas');
				if (canvas.getContext){
					var ctx = canvas.getContext('2d');
					ctx.font="bold 10pt FunctionPro";
					ctx.fillStyle = "#43a4fe";
					//trying to manage strokes here...
					if (orgcurve == 0) {
						if(iscurve(i,sidearray)) {
							ctx.moveTo(cp1x,cp1y);  
							//ctx.lineTo(xcoord,ycoord);
							if (i == 0) {
								prevx = originx;
								prevy = originy;
							}
							else {
								prevx = sidearray[i-1][0];
								prevy = sidearray[i-1][1];
							}
							ctx.lineTo(prevx,prevy);
							ctx.moveTo(cp2x,cp2y);
							ctx.lineTo(xcoord,ycoord);
							ctx.strokeStyle = "#bbbbbb";
							ctx.stroke();
							ctx.fillRect(cp1x-2,cp1y-2,4,4);
							ctx.fillRect(cp2x-2,cp2y-2,4,4);
						}
					}
					if(orgcurve == 1) {
						ctx.moveTo(org1x,org1y);  
						ctx.lineTo(sidearray[sidearray.length-1][0],sidearray[sidearray.length-1][1]);
						ctx.moveTo(org2x,org2y);
						ctx.lineTo(originx,originy);
						if(iscurve(i,sidearray)) {
							ctx.moveTo(cp1x,cp1y);  
							if (i == 0) {
								prevx = originx;
								prevy = originy;
							}
							else {
								prevx = sidearray[i-1][0];
								prevy = sidearray[i-1][1];
							}
							ctx.lineTo(prevx,prevy);
							ctx.moveTo(cp2x,cp2y);
							ctx.lineTo(xcoord,ycoord);
						}
						ctx.strokeStyle = "#bbbbbb";
						ctx.stroke();
						if(iscurve(i,sidearray)) {
							ctx.fillRect(cp1x-2,cp1y-2,4,4);
							ctx.fillRect(cp2x-2,cp2y-2,4,4);
						}

						ctx.fillRect(org1x-2,org1y-2,4,4);
						ctx.fillRect(org2x-2,org2y-2,4,4);

					}
					ctx.fillStyle = "#fe4365";					
					ctx.fillRect(xcoord-2,ycoord-2, 4, 4);
					ctx.fillRect(originx-2,originy-2, 4, 4);
					ctx.fillStyle = "#43A4FE";					
					ctx.fillText(i+1, xcoord, ycoord);
					ctx.fillText(0,originx,originy);
				}

			}
	}

	function hidepoints() {
		draw(rval,gval,bval,orgx,orgy,sides,false);
	}

	function setcurve(sidenum,sidearray) {
		sidearray[sidenum][2]=1;
	}
	function setline(sidenum,sidearray) {
		sidearray[sidenum][2]=0;
	}

	function iscurve(sidenum,sidearray) {
		if (sidearray[sidenum][2]==1) {
			return true;
		}
		else if (sidearray[sidenum][2]==0) {
			return false;
		}
	}

	// $draw
	function draw(red,green,blue,originx,originy,numsides,sideadded){
	  var canvas = document.getElementById('canvas');
	  if (canvas.getContext){
			var ctx = canvas.getContext('2d');

			// Retina wizardry!
			if ( window.devicePixelRatio ) {
				var el = $('#canvas');
				var elWidth = $('#canvas').width();
				var elHeight = $('#canvas').height();
				el.attr('width', elWidth * window.devicePixelRatio);
				el.attr('height', elHeight * window.devicePixelRatio);
				el.css('width', elWidth);
				el.css('height', elHeight);
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}

			//clear canvas
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.restore();
			//initialize side array
			var sidearray = gensidecoordarray(numsides);
			j = 0;
			for (j=0;j<numsides;j++) {
				xcoord = $('input.sidecoordx[side='+j+']').attr('value');
				if (!xcoord) {
					xcoord = sidearray[j][0];
				}
				ycoord = $('input.sidecoordy[side='+j+']').attr('value');
				if (!ycoord) {
					ycoord = sidearray[j][1];
				}
				if($('input.setcurve[side='+j+']').attr('value')==1) { //if a curve, do this additional work
					sidearray[j][2] = 1;
					curve1x = $('input.curvecoord1x[side='+j+']').attr('value');
					if (!curve1x) {
						curve1x = sidearray[j][3];
					}
					curve1y = $('input.curvecoord1y[side='+j+']').attr('value');
					if (!curve1y) {
						curve1y = sidearray[j][4];
					}
					curve2x = $('input.curvecoord2x[side='+j+']').attr('value');
					if (!curve2x) {
						curve2x = sidearray[j][5];
					}
					curve2y = $('input.curvecoord2y[side='+j+']').attr('value');
					if (!curve2y) {
						curve2y = sidearray[j][6];
					}
					setcurvecoord(j,curve1x,curve1y,curve2x,curve2y,sidearray);
				}
				setsidecoord(j,xcoord,ycoord,sidearray);
			}
			if (sideadded) {
				gensidecontrols(numsides,sidearray);
				genhandles(numsides,sidearray,originx,originy);
				activatehandles();
			}
			//start drawing
			ctx.clearRect(0, 0, $('#canvas').width(),$('#canvas').height() ); // draw a clear rectangle to show the grid layer below
			ctx.fillStyle = "rgb("+red+","+green+","+blue+")";
			ctx.beginPath();
			ctx.moveTo(originx,originy);
			i = 0;
			//generate the lines
			for (i=0;i<numsides;i++) {
				if(iscurve(i,sidearray)) {
					ctx.bezierCurveTo(sidearray[i][3], sidearray[i][4], sidearray[i][5], sidearray[i][6], sidearray[i][0], sidearray[i][1]);
				}
				else {
					ctx.lineTo(sidearray[i][0],sidearray[i][1]);
				}
			}
			if(orgcurve == 0) {
				ctx.lineTo(originx,originy);
			}
			else {
				ctx.bezierCurveTo(org1x,org1y,org2x,org2y,originx,originy);
			}
			ctx.fill();
			if($('#showpoints').attr('value')==1) {
				showpoints(numsides,sidearray,originx,originy);
			}
			if($('#generatecode').attr('value')==1) {
				generatecode();
			}
		}
	}

	//generates side controls
	function gensidecontrols(numsides,sidearray) {
		var point0ctrl = $('li#point0');
		$('#sidecontrols ul').html('');
		i = 0;
		for (i=0;i<numsides;i++) {
			sidenum = i+1;
			curveval = sidearray[i][2];
			if(curveval==1) {
				$('#sidecontrols ul').append("<li side='"+i+"'><h2>Point "+sidenum+"</h2><input size='3' class='aninput coord sidecoordx' side='"+i+"' type='text' value='"+sidearray[i][0]+"' maxlength='3' /><input size='3' class='aninput coord sidecoordy' side='"+i+"' type='text' value='"+sidearray[i][1]+"' maxlength='3' /><input type='checkbox' class='setcurve' value='"+curveval+"' side='"+i+"' /> Curve<br /><input size='3' class='aninput coord curvecoord1x' side='"+i+"' type='text' value='"+sidearray[i][3]+"' maxlength='3' style='clear:both;' /><input size='3' class='aninput coord curvecoord1y' side='"+i+"' type='text' value='"+sidearray[i][4]+"' maxlength='3' /><input size='3' class='aninput coord curvecoord2x' side='"+i+"' type='text' value='"+sidearray[i][5]+"' maxlength='3' /><input size='3' class='aninput coord curvecoord2y' side='"+i+"' type='text' value='"+sidearray[i][6]+"' maxlength='3' /></li></li>");
				$('#sidecontrols ul input[side="'+i+'"]').prop("checked", true);
			}
			else {
				$('#sidecontrols ul').append("<li side='"+i+"'><h2>Point "+sidenum+"</h2><input size='3' class='aninput coord sidecoordx' side='"+i+"' type='text' value='"+sidearray[i][0]+"' maxlength='3' /><input size='3' class='aninput coord sidecoordy' side='"+i+"' type='text' value='"+sidearray[i][1]+"' maxlength='3' /><input type='checkbox' class='setcurve' value='"+curveval+"' side='"+i+"' /> Curve</li>");
			}
			point0ctrl.prependTo($('#sidecontrols ul'));
		}
	}

	//generates point handles
	function genhandles(numsides,sidearray,originx,originy) {
		i = 0;
		originy = originy - 4;
		originx = originx - 4;
		$('#left').append("<div class='handle' style='top:"+originy+"px;left:"+originx+"px;' point='0'></div>");
		if(orgcurve == 1) {
			$('#left').append("<div class='bhandle' style='top:"+org1x+"px;left:"+org1y+"px;' point='0' handle='1'></div>");	
			$('#left').append("<div class='bhandle' style='top:"+org2x+"px;left:"+org2y+"px;' point='0' handle='2'></div>");
		}
		for (i=0;i<numsides;i++) {
			var xcoord = sidearray[i][0] - 4;
			var ycoord = sidearray[i][1] - 4;
			cp1x = sidearray[i][3] - 4;
			cp1y = sidearray[i][4] - 4;
			cp2x = sidearray[i][5] - 4;
			cp2y = sidearray[i][6] - 4;
			pointnum = i+1;
			$('#left').append("<div class='handle' style='top:"+ycoord+"px;left:"+xcoord+"px;' point='"+pointnum+"'></div>");
			if(iscurve(i,sidearray)) {
				$('#left').append("<div class='bhandle' style='top:"+cp1x+"px;left:"+cp1y+"px;' point='"+pointnum+"' handle='1'></div>");
				$('#left').append("<div class='bhandle' style='top:"+cp2x+"px;left:"+cp2y+"px;' point='"+pointnum+"' handle='2'></div>");
			}
		}
	}

	//handle function
		function activatehandles() {
			$('.handle').each(function() {
				$(this).draggable({
					drag: function(e) {
							xPos = parseInt($(this).css('left'));
							yPos = parseInt($(this).css('top'));
							if ($('#snapgrid').val() == 1) {	// if grid snap is turned on...
								xPos = Math.round(xPos/gridscale)*gridscale;
								yPos = Math.round(yPos/gridscale)*gridscale;
							}
							if ($(this).attr('point')==0) {
								$('#origin_x').attr('value',xPos);
								$('#origin_y').attr('value',yPos);
								orgx = xPos;
								orgy = yPos;
								draw(rval,gval,bval,orgx,orgy,sides,false);								
							}
							else {
								pointid = parseInt($(this).attr('point')) - 1;
								$('.sidecoordx[side='+pointid+']').attr('value',xPos);
								$('.sidecoordy[side='+pointid+']').attr('value',yPos);
								$('.sidecoordx[side='+pointid+']').parent().addClass('selectedpoint');
								setsidecoord(pointid,xPos,yPos,sideCoords);
								draw(rval,gval,bval,orgx,orgy,sides,false);
							}
					},
					stop: function(e) {
							pointid = parseInt($(this).attr('point')) - 1;
							xPos = parseInt($(this).css('left'));
							yPos = parseInt($(this).css('top'));
							if ($('#snapgrid').val() == 1) {	// if grid snap is turned on...
								xPos = Math.round(xPos/gridscale)*gridscale;
								yPos = Math.round(yPos/gridscale)*gridscale;
							}
							if ($(this).attr('point')==0) {
								$('#origin_x').attr('value',xPos);
								$('#origin_y').attr('value',yPos);
								orgx = xPos;
								orgy = yPos;
								draw(rval,gval,bval,orgx,orgy,sides,false);								
							}
							else {
								pointid = parseInt($(this).attr('point')) - 1;
								$('.sidecoordx[side='+pointid+']').attr('value',xPos);
								$('.sidecoordy[side='+pointid+']').attr('value',yPos);
								$('.sidecoordx[side='+pointid+']').parent().addClass('selectedpoint');
								setsidecoord(pointid,xPos,yPos,sideCoords);
								draw(rval,gval,bval,orgx,orgy,sides,false);
							}
							$('.sidecoordx[side='+pointid+']').parent().removeClass('selectedpoint');
							//ensure that the handles stay with the point
							$(this).css('left',xPos);
							$(this).css('top',yPos);
					}
				});
			});
			$('.bhandle').each(function() {
				$(this).draggable({
					drag: function(e) {
						xPos = parseInt($(this).css('left'));
						yPos = parseInt($(this).css('top'));
						if ($('#snapgrid').val() == 1) {	// if grid snap is turned on...
								xPos = Math.round(xPos/gridscale)*gridscale;
								yPos = Math.round(yPos/gridscale)*gridscale;
						}
						if ($(this).attr('point')==0) {
							if($(this).attr('handle')==1) {							
								$('#orgc1x').attr('value',xPos);
								$('#orgc1y').attr('value',yPos);
								org1x = $('#orgc1x').attr('value');
								org1y = $('#orgc1y').attr('value');
							}
							else {
								$('#orgc2x').attr('value',xPos);
								$('#orgc2y').attr('value',yPos);
								org2x = $('#orgc2x').attr('value');
								org2y = $('#orgc2y').attr('value');
							}
							draw(rval,gval,bval,orgx,orgy,sides,false);								
						}
						else {
							pointid = parseInt($(this).attr('point')) - 1;
							if($(this).attr('handle')==1) {
								$('.curvecoord1x[side='+pointid+']').attr('value',xPos);
								$('.curvecoord1y[side='+pointid+']').attr('value',yPos);
								curve2x = $('.curvecoord2x[side='+pointid+']').attr('value');
								curve2y = $('.curvecoord2y[side='+pointid+']').attr('value');
								setcurvecoord(pointid,xPos,yPos,curve2x,curve2y,sideCoords);															
							}
							else {
								$('.curvecoord2x[side='+pointid+']').attr('value',xPos);
								$('.curvecoord2y[side='+pointid+']').attr('value',yPos);
								curve1x = $('.curvecoord1x[side='+pointid+']').attr('value');
								curve1y = $('.curvecoord1y[side='+pointid+']').attr('value');
								setcurvecoord(pointid,curve1x,curve1y,xPos,yPos,sideCoords);
							}
							$('.curvecoord1x[side='+pointid+']').parent().addClass('selectedpoint');
							draw(rval,gval,bval,orgx,orgy,sides,false);
						}
					},
					stop: function(e) {
						xPos = parseInt($(this).css('left'));
						yPos = parseInt($(this).css('top'));
						if ($('#snapgrid').val() == 1) {	// if grid snap is turned on...
								xPos = Math.round(xPos/gridscale)*gridscale;
								yPos = Math.round(yPos/gridscale)*gridscale;
						}
						if ($(this).attr('point')==0) {
							if($(this).attr('handle')==1) {							
								$('#orgc1x').attr('value',xPos);
								$('#orgc1y').attr('value',yPos);
								org1x = $('#orgc1x').attr('value');
								org1y = $('#orgc1y').attr('value');
							}
							else {
								$('#orgc2x').attr('value',xPos);
								$('#orgc2y').attr('value',yPos);
								org2x = $('#orgc2x').attr('value');
								org2y = $('#orgc2y').attr('value');
							}
							draw(rval,gval,bval,orgx,orgy,sides,false);								
						}
						else {
							pointid = parseInt($(this).attr('point')) - 1;
							if($(this).attr('handle')==1) {
								$('.curvecoord1x[side='+pointid+']').attr('value',xPos);
								$('.curvecoord1y[side='+pointid+']').attr('value',yPos);
								curve2x = $('.curvecoord2x[side='+pointid+']').attr('value');
								curve2y = $('.curvecoord2y[side='+pointid+']').attr('value');
								setcurvecoord(pointid,xPos,yPos,curve2x,curve2y,sideCoords);															
							}
							else {
								$('.curvecoord2x[side='+pointid+']').attr('value',xPos);
								$('.curvecoord2y[side='+pointid+']').attr('value',yPos);
								curve1x = $('.curvecoord1x[side='+pointid+']').attr('value');
								curve1y = $('.curvecoord1y[side='+pointid+']').attr('value');
								setcurvecoord(pointid,curve1x,curve1y,xPos,yPos,sideCoords);
							}
							draw(rval,gval,bval,orgx,orgy,sides,false);
							$('.curvecoord1x[side='+pointid+']').parent().removeClass('selectedpoint');
							//ensure that the handles stay with the point
							$(this).css('left',xPos);
							$(this).css('top',yPos);
						}
					}
				});
			});
		}

	//generate code!
		function generatecode() {
			gR = $('#red').attr('value');
			gG = $('#green').attr('value');
			gB = $('#blue').attr('value');
			gOx = $('#origin_x').attr('value');
			gOy = $('#origin_y').attr('value');
			gOc = $('#origin_curve').attr('value');
			gOc1x = $('#orgc1x').attr('value');
			gOc1y = $('#orgc1y').attr('value');
			gOc2x = $('#orgc2x').attr('value');
			gOc2y = $('#orgc2y').attr('value');
			gSides = parseInt($('#sides').attr('value')) - 1;

			$('#code textarea').html("&lt;script type='text\/javascript'&gt;\n"+
			"function draw() {\n"+
			"\tvar canvas = document.getElementById('canvas');\n"+
			"\tif (canvas.getContext){\n"+
			"\t\tvar ctx = canvas.getContext('2d');\n"+
			"\t\tctx.fillStyle = 'rgb("+gR+","+gG+","+gB+")';\n"+
			"\t\tctx.beginPath();\n"+
			"\t\tctx.moveTo("+gOx+","+gOy+");\n");

			i = 0;
			for (i=0;i<gSides;i++) {
				if($('.setcurve[side='+i+']').attr('value')==1) {
					gpx = $('.sidecoordx[side='+i+']').attr('value');
					gpy = $('.sidecoordy[side='+i+']').attr('value');
					gc1x = $('.curvecoord1x[side='+i+']').attr('value');
					gc1y = $('.curvecoord1y[side='+i+']').attr('value');
					gc2x = $('.curvecoord2x[side='+i+']').attr('value');
					gc2y = $('.curvecoord2y[side='+i+']').attr('value');
					$('#code textarea').append("\t\tctx.bezierCurveTo("+gc1x+", "+gc1y+", "+gc2x+", "+gc2y+", "+gpx+", "+gpy+");\n");
				}
				else {
					gpx = $('.sidecoordx[side='+i+']').attr('value');
					gpy = $('.sidecoordy[side='+i+']').attr('value');
					$('#code textarea').append("\t\tctx.lineTo("+gpx+","+gpy+");\n");
				}
			}
			if(gOc==1) {
					$('#code textarea').append("\t\tctx.bezierCurveTo("+gOc1x+","+gOc1y+","+gOc2x+","+gOc2y+","+gOx+","+gOy+");\n");
			}
			else {
					$('#code textarea').append("\t\tctx.lineTo("+gOx+","+gOy+");\n");
			}
			$('#code textarea').append("\t\tctx.fill();\n"+
			"\t}\n"+
			"}\n");
			$('#code textarea').append("&lt;\/script&gt;\n\n"+
			"&lt;body onload='draw()'&gt;");
		}


	// set controls
	$(function() {

		//generate sliders
		$('#red-slider').slider({
			max:255,
			min:0,
			step:1,
			slide: function(event, ui) {
				$('input#red').val(ui.value).keyup();
			}
		});	
		$('#green-slider').slider({
			max:255,
			min:0,
			step:1,
			slide: function(event, ui) {
				$('input#green').val(ui.value).keyup();
			}
		});		
		$('#blue-slider').slider({
			max:255,
			min:0,
			step:1,
			slide: function(event, ui) {
				$('input#blue').val(ui.value).keyup();
			}
		});	
		$('#side-slider').slider({
			max:100,
			min:0,
			step:1,
			value:4,
			slide: function(event, ui) {
				$('input#sides').val(ui.value).keyup();
			}
		});
		$('#gridscale').slider({
			max:100,
			min:10,
			step:5,
			value:10,
			slide: function(event, ui) {
				$('#gridscaleval').html(ui.value);
				gridscale = ui.value;
				gengrid(ui.value * window.devicePixelRatio);								
			},
		});


		//arrow key incrementing
		$('.aninput').live('keydown',function(e) {
			if(e.keyCode==38 && !e.shiftKey) {
			 	this.value++;
			}
			else if(e.keyCode==40 && !e.shiftKey) {
			 	this.value--;
			}
			else if(e.keyCode==38 && e.shiftKey) {
			 	this.value = parseInt(this.value) + 10;
			}
			else if(e.keyCode==40 && e.shiftKey) {
			 	this.value = parseInt(this.value) - 10;
			}
		});
		
		//numbers only!
		$('.aninput').keyup(function(e) { 
   			 this.value = this.value.replace(/[^0-9\.]/g,'');
		});

		//RGB color inputs
		$('input#red').keyup(function() {
			if (this.value > 255) {
				this.value = 255;
			}
			$('#red-slider').slider("option","value",this.value);
			rval = this.value;
			draw(rval,gval,bval,orgx,orgy,sides,false);
		});
		$('input#green').keyup(function() {
			if (this.value > 255) {
				this.value = 255;
			}
			$('#green-slider').slider("option","value",this.value);			
			gval = this.value;
			draw(rval,gval,bval,orgx,orgy,sides,false);
		});
		$('input#blue').keyup(function() {
			if (this.value > 255) {
				this.value = 255;
			}
			$('#blue-slider').slider("option","value",this.value);			
			bval = this.value;
			draw(rval,gval,bval,orgx,orgy,sides,false);
		});

		//origin coord inputs
		$('input#origin_x').keyup(function() {
			orgx = this.value;
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.handle[point=0]').attr('style','top:'+orgy+'px;left:'+orgx+'px;');
		});
		$('input#origin_y').keyup(function() {
			orgy = this.value;
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.handle[point=0]').attr('style','top:'+orgy+'px;left:'+orgx+'px;');
		});

		//set number of sides
		$('input#sides').keyup(function() {
			if (this.value < 3) {
				this.value = 3;
			}
			else if (this.value > 100) {
				this.value = 100;
			}
			sides = this.value - 1;
			draw(rval,gval,bval,orgx,orgy,sides,true);
		});

		//origin curve handle coords 
		$('input#orgc1x').live('keyup',function() {
			org1x = parseInt($(this).attr('value'));
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.bhandle[point=0][handle=1]').attr('style','top:'+org1y+'px;left:'+org1x+'px;');
		});
		$('input#orgc1y').live('keyup',function() {
			org1y = parseInt($(this).attr('value'));
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.bhandle[point=0][handle=1]').attr('style','top:'+org1y+'px;left:'+org1x+'px;');
		});
		$('input#orgc2x').live('keyup',function() {
			org2x = parseInt($(this).attr('value'));
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.bhandle[point=0][handle=2]').attr('style','top:'+org2y+'px;left:'+org2x+'px;');
		});
		$('input#orgc2y').live('keyup',function() {
			org2y = parseInt($(this).attr('value'));
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			$('.bhandle[point=0][handle=2]').attr('style','top:'+org2y+'px;left:'+org2x+'px;');
		});


		//set indiv side coords
		$('input.sidecoordx').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.sidecoordy').attr('value'))-4;
			$('.handle[point='+pointnum+']').attr('style','top:'+keepvalue+'px;left:'+thisvalue+'px;');
		});
		$('input.sidecoordy').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.sidecoordx').attr('value'))-4;
			$('.handle[point='+pointnum+']').attr('style','top:'+thisvalue+'px;left:'+keepvalue+'px;');
		});

		//set indiv curve handle coords
		$('input.curvecoord1x').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.curvecoord1y').attr('value'))-4;
			$('.bhandle[point='+pointnum+'][handle=1]').attr('style','top:'+keepvalue+'px;left:'+thisvalue+'px;');
		});
		$('input.curvecoord1y').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.curvecoord1x').attr('value'))-4;
			$('.bhandle[point='+pointnum+'][handle=1]').attr('style','top:'+thisvalue+'px;left:'+keepvalue+'px;');
		});
		$('input.curvecoord2x').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.curvecoord2y').attr('value'))-4;
			$('.bhandle[point='+pointnum+'][handle=2]').attr('style','top:'+keepvalue+'px;left:'+thisvalue+'px;');
		});
		$('input.curvecoord2y').live('keyup',function() {
			draw(rval,gval,bval,orgx,orgy,sides,false);
			//readjust handle
			pointnum = parseInt($(this).attr('side')) + 1;
			thisvalue = parseInt($(this).attr('value'))-4;
			keepvalue = parseInt($(this).parent().find('.curvecoord2x').attr('value'))-4;
			$('.bhandle[point='+pointnum+'][handle=2]').attr('style','top:'+thisvalue+'px;left:'+keepvalue+'px;');
		});



		//show/hide points
		$('#showpoints').change(function() {
				if ($(this).attr('value')==0) {
					$(this).attr('value',1);
					showpoints(sides,sideCoords,orgx,orgy);
				}
				else {
					$(this).attr('value',0);
					hidepoints();
				}
		});

		//show/hide grid
		$('#showgrid').change(function() {
				if ($(this).attr('value')==0) {
					$(this).attr('value',1);
					$('#grid').css('display','block');					
				}
				else {
					$(this).attr('value',0);
					$('#grid').hide();					
				}
		});

		//snap/don't snap to grid
		$('#snapgrid').change(function() {
				if ($(this).attr('value')==0) {
					$(this).attr('value',1);
				}
				else {
					$(this).attr('value',0);
				}
				draw(rval,gval,bval,orgx,orgy,sides,false);							
		});

		//set curve/line
		$('.setcurve').live('change',function() {
			if($(this).attr('id')=='origin_curve') {
				if ($(this).attr('value')==0) {
					$(this).attr('value',1);
					orgcurve = 1;
					$('#orig_curve_controls').fadeIn('500');
				}
				else {
					$(this).attr('value',0);
					orgcurve = 0;
					$('#orig_curve_controls').fadeOut('500');
				}
			}
			else {
				pointnum = $(this).parent().find('input').attr('side');
				if ($(this).attr('value')==0) {
					$(this).attr('value',1);
					setcurve(pointnum,sideCoords);
				}
				else {
					$(this).attr('value',0);
					setline(pointnum,sideCoords);
				}
			}
			draw(rval,gval,bval,orgx,orgy,sides,true);
		});

		$('#generatecode').live('click',function() {
			$(this).attr('value',1);
			generatecode();
			$('#hideme').fadeIn('300');						
			$('#code').addClass('expandedcode');
			$('#code textarea').addClass('expandedtextarea');
			return false;
		});

		$('#hideme').live('click',function() {
			$(this).fadeOut('100');			
			$('#code').removeClass('expandedcode');
			$('#code textarea').removeClass('expandedtextarea');
			return false;
		});

	});

