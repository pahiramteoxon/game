var game = { 
	level: 1, 
	turn: 0, 
	difficulty: 1, 
	score: 0, 
	active: false, 
	handler: false, 
	shape: '.shape', 
	genSequence: [], 
	plaSequence: [], 
	
	init: function(){					
		if(this.handler === false){		
			this.initPadHandler();	
		}
		this.newGame();		

	},

	initPadHandler: function(){

		that=this;

		$('.pad').on('mouseup',function(){

			if(that.active===true){

				var pad=parseInt($(this).data('pad'),10);
					
				that.flash($(this),1,300, pad);

				that.logPlayerSequence(pad);

			}
		});

		this.handler=true;

	},

	newGame: function(){			

		this.level=1;
		this.score=0;
		this.newLevel();
		this.displayLevel();
		this.displayScore();

	},

	newLevel: function(){
		
		this.genSequence.length=0;
		this.plaSequence.length=0;
		this.pos=0;
		this.turn=0;
		this.active=true;
		
		this.randomizePad(this.level); 
		this.displaySequence(); 

	},
	
	flash: function(element, times, speed, pad){ 

		var that = this;						

		if(times > 0){							
			that.playSound(pad);				
			element.stop()
				// animate({opacity:'0.3'} ,  {
				.delay(0).fadeOut().fadeIn(), {		
				duration: 500,
				complete: function(){
				element.stop().animate({opacity: '1'}, 300);
				}
			};												

		}

		if (times > 0) {									
			setTimeout(function () {
				that.flash(element, times, speed, pad);
			}, speed);
			times -= 1;						
		}
	},

	playSound: function(clip){				


		var sound= $('.sound'+clip)[0];
		console.log(sound);
		console.log($('.sound'+clip));
		sound.currentTime=0;				
		sound.play();						


	},

	randomizePad: function(passes){			

		for(i=0;i<passes;i++){
			
			this.genSequence.push(Math.floor(Math.random() * 5) + 1);
		}
	},

	logPlayerSequence: function(pad){		

		this.plaSequence.push(pad);
		this.checkSequence(pad);
		
	
	},

	checkSequence: function(pad){			

		that=this;

		if(pad !== this.genSequence[this.turn]){	
				
				this.incorrectSequence();

			}else{									
				this.keepScore();					
				this.turn++;						

			}

		if(this.turn === this.genSequence.length){	
			
			this.level++;							
			this.displayLevel();
			this.active=false;
			setTimeout(function(){
				that.newLevel();
			},1000);
		}
	},

	displaySequence: function(){					
		
		var that=this;

		$.each(this.genSequence, function(index, val) {		
			
			setTimeout(function(){
				
				that.flash($(that.shape+val),1,300,val);
			
			},500*index*that.difficulty);				
		});
	},

	displayLevel: function(){							
		
		$('.level h2').text('Level: '+this.level);
		$('#levelp').text('Level: '+this.level);

	},

	displayScore: function(){							
		$('.score h2').text('Score: '+this.score);
		$('#scorep').text('Score: '+this.score);
	},

	keepScore: function(){								
		
		var multiplier=0;

		switch(this.difficulty)							
		{
			case '2':
				multiplier=1;
				break;
			
			case '1':
				multiplier=2;
				break;

			case '0.5':
				multiplier = 3;
				break;

			case '0.25':
				multiplier = 4;
				break;
		}

		this.score += (1 * multiplier);					

		this.displayScore();							
	},

	incorrectSequence: function(){						
		var recentscore = $('.score').html();
		var recentlevel = $('.level').html();

		var corPad = this.genSequence[this.turn],		
			
			that = this;
			this.active=false;
			this.displayLevel();
			this.displayScore();

		// setTimeout(function(){							
		// 	that.flash($(that.shape+corPad),4,300,corPad);
		// },500);
		
		$('.start').show();								
		$('.difficulty').show();
  		$('.md-modal').addClass('md-show');
  	
		

	}

};
$(document).ready(function(){							

	$('.start').on('mouseup', function(){				
		$(this).hide();
		game.difficulty = $('input[name=difficulty]:checked').val();
		$('.difficulty').hide();
		game.init();


	});

	
});

$(function () {
    
  $('.md-close').on('click', function() {
    $('.md-modal').removeClass('md-show');
  });
  
});

