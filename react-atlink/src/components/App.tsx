import * as React from "react";
import { hot } from "react-hot-loader";
import  Lightbox  from 'react-lightbox-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const API_PATH = 'http://sithilas.com/send.php';


//const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
declare let Modernizr:any;
declare let classie:any;
declare let id:any;
declare let i:any;
declare let $:any;
declare const current:any;

let state:string = '';
class App extends React.Component<{}, undefined> {

	constructor(props:any) {
		super(props);                     
		const state = {                      
			fname: "",
			lname: "",
			email: "",
			message: "",
			mailSent: false,
			error: null                    
		 }
	 }
	 handleFormSubmit = e => {
		e.preventDefault();
		axios({
		   method: 'post',
		   url: `${API_PATH}`,
		   headers: { 'content-type': 'application/json' },
		   data: this.state
		 })
		 .then(result => {
			this.setState({
			  mailSent: result.data.sent
		  })
		 })
		 .catch(error => this.setState({ error: error.message }));
	  }
	
    componentDidMount() {

		



;(function(window) {

	'use strict';

	$('.openportfolio').on('click',function(ev){
		ev.preventDefault();
		openMenu();
		openPage('page-docu');
	 });
	 $('.openphotography').on('click',function(ev){
		ev.preventDefault();
		openMenu();
		openPage('page-training');
	 });
	 

	$('.play-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn(this);
			}
		},
		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		// menu button
		menuCtrl = document.querySelector('button.menu-button'),

		logo = document.querySelector('.logo'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		// check if menu is open
		isMenuOpen = false;

	function init() {
		buildStack();
		initEvents();
	}

	function buildStack() {
		var stackPagesIdxs = getStackPagesIdxs(this);
		
		// set z-index, opacity, initial transforms to pages and add class page--inactive to all except the current one
		for(var i = 0; i < pagesTotal; ++i) {
			var page = pages[i],
				posIdx = stackPagesIdxs.indexOf(i);
				//console.log(posIdx);
			if( current !== i ) {
				classie.add(page, 'page--inactive');

				if( posIdx !== -1 ) {
					// visible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,100%,0)';
					page.style.transform = 'translate3d(0,100%,0)';
				}
				else {
					// invisible pages in the stack
					page.style.WebkitTransform = 'translate3d(0,75%,-300px)';
					page.style.transform = 'translate3d(0,75%,-300px)';		
				}
			}
			else {
				classie.remove(page, 'page--inactive');
				
			}
			console.log(i);
			page.style.zIndex = i < current ? Math.trunc(current - i) : Math.trunc(pagesTotal + current - i);
			//console.log(page.style.zIndex);
			if( posIdx !== -1 ) {
				//console.log(posIdx);
				page.style.opacity = Math.max(1 - 0.1 * posIdx);
				//page.style.opacity = Math.trunc(1 - 0.1 * posIdx);
			}
			else {
				page.style.opacity = 0;
			}
		}
	}
	
	

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', toggleMenu);

		// navigation menu clicks
		navItems.forEach(function(item) {
			// which page to open?
			var pageid = item.getAttribute('href').slice(1);
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				console.log(pageid);
				openPage(pageid);
			});
		});
		

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		pages.forEach(function(page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function(ev) {
				if( isMenuOpen ) {
					ev.preventDefault();
					openPage(pageid);
				}
			});
		});

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if( !isMenuOpen ) return; 
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 27 ) {
				closeMenu();
			}
		} );
	}

	// toggle menu fn
	function toggleMenu() {
		if( isMenuOpen ) {
			closeMenu();
		}
		else {
			openMenu();
			isMenuOpen = true;
		}
	}

	

	// opens the menu
	function openMenu() {
		// toggle the menu button
		classie.add(menuCtrl, 'menu-button--open')
		// stack gets the class "pages-stack--open" to add the transitions
		classie.add(stack, 'pages-stack--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');
        classie.add(logo, 'hide');
		//console.log('open');

		// now set the page transforms
		var stackPagesIdxs = getStackPagesIdxs(this);
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			//console.log(parseInt(-1 * 200 - 50*i));
			page.style.WebkitTransform = 'translate3d(0, 75%, ' + Math.trunc(-1 * 200 - 50*i) + 'px)'; // -200px, -230px, -260px
			page.style.transform = 'translate3d(0, 75%, ' + Math.trunc(-1 * 200 - 50*i) + 'px)';
		}
	}

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		classie.remove(logo, 'hide');
		openPage(this);
		
	}

	// opens a page
	function openPage(id) {
		
		var futurePage = id ? document.getElementById(id) : pages[current],
			futureCurrent = pages.indexOf(futurePage),
			stackPagesIdxs = getStackPagesIdxs(futureCurrent);

		// set transforms for the new current page
		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;

		// set transforms for the other items in the stack
		for(var i = 0, len = stackPagesIdxs.length; i < len; ++i) {
			var page = pages[stackPagesIdxs[i]];
			page.style.WebkitTransform = 'translate3d(0,100%,0)';
			page.style.transform = 'translate3d(0,100%,0)';
		}

		// set current
		if( id ) {
			current = futureCurrent;
		}
		
		// close menu..
		classie.remove(menuCtrl, 'menu-button--open');
		classie.remove(logo, 'hide');
		classie.remove(nav, 'pages-nav--open');
		onEndTransition(futurePage, function() {
			classie.remove(stack, 'pages-stack--open');
			// reorganize stack
			buildStack();
			isMenuOpen = false;
		});
	}

	// gets the current stack pages indexes. If any of them is the excludePage then this one is not part of the returned array
	function getStackPagesIdxs(excludePageIdx) {
		var nextStackPageIdx = current + 1 < pagesTotal ? current + 1 : 0,
			nextStackPageIdx_2 = current + 2 < pagesTotal ? current + 2 : 1,
			idxs = [],

			excludeIdx = excludePageIdx || -1;

		if( excludePageIdx != current ) {
			idxs.push(current);
		}
		if( excludePageIdx != nextStackPageIdx ) {
			idxs.push(nextStackPageIdx);
		}
		if( excludePageIdx != nextStackPageIdx_2 ) {
			idxs.push(nextStackPageIdx_2);
		}

		return idxs;
	}

	init();

})(window);
    }
    public render() {
		
        return (
            <React.Fragment> 
	<nav className="pages-nav">
		<div className="pages-nav__item"><a className="link link--page" href="#page-home">Home</a></div>
		<div className="pages-nav__item"><a className="link link--page" href="#page-docu">Portfolio</a></div>
		<div className="pages-nav__item"><a className="link link--page" href="#page-manuals">Blog</a></div>
		<div className="pages-nav__item"><a className="link link--page" href="#page-software">Graphic/ Branding</a></div>
		<div className="pages-nav__item"><a className="link link--page" href="#page-custom">UI / UX</a></div>
		<div className="pages-nav__item"><a className="link link--page" href="#page-training">Photography</a></div>
		
		<div className="pages-nav__item pages-nav__item--small"><a className="link link--page link--faded" href="#page-contact">Contact</a></div>
		<div className="pages-nav__item pages-nav__item--social">
			
		<a className="link link--social link--faded" href={'https://www.linkedin.com/in/sithila/'} target="_blank"> <i className="fab fa-linkedin"></i><span className="text-hidden">LinkedIn</span></a>
		<a className="link link--social link--faded" href={'https://www.facebook.com/epicsitha'} target="_blank"><i className="fab fa-facebook-square"></i><span className="text-hidden">Facebook</span></a>

		</div>
		
	</nav>
	
	<div className="pages-stack">
		
		<div className="page" id="page-home">
			
			<div className="content">
                        
					<div className="demo">
						<div className="scrollbar-inner">


	
	<section className="home-banner-area relative">
		<div className="container-fluid">
			<div className="row d-flex align-items-center justify-content-center">
				<div className="header-right col-lg-6 col-md-6">
				<div className="main_title">
							<h1>My passion is <br/>Designing <br/> things..</h1>
							<p>Person who has passion to create User Interfaces for products with better 
        user experience. He also passionate about branding and new technologies. 
        He use to travel to wild and untouched places, because he likes photograph 
        stories. He likes to tell stories to you with his experience and imaginations. 
        Here is little bit of his story.</p>
						</div>
					
					<a href=""  className="main_btn openportfolio" >
						My portfolio
						<img src="/images/next.png" alt=""/>
					</a>
				
				</div>

				<div className="col-lg-6 col-md-6 header-left">
					<div className="">
						<img className="img-fluid w-100" src="/images/banner/banner-img.jpg" alt=""/>
					</div>
					<div className="video-popup d-flex align-items-center">
						<a className="play-video video-play-button animate" href="https://www.youtube.com/watch?v=9TFx7TcFuoI" data-animate="zoomIn"
						 data-duration="1.5s" data-delay="0.1s">
							<span></span>
						</a>
						<div className="watch">
							<h5>Watch Intro Video</h5>
							<p>You will love our execution</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>



	<div className="popular-place-area section_gap">
		<div className="container">
			<div className="row align-items-center justify-content-center">
				<div className="col-lg-5 offset-lg-1">
					<div className="left-content">
						<img className="img1 img-fluid" src="/images/popular/img1.jpg" alt=""/>
						<img className="img2 img-fluid" src="/images/popular/img2.png" alt=""/>
						<img className="img3 img-fluid" src="/images/popular/img3.jpg" alt=""/>
					</div>
				</div>
				<div className="col-lg-5 offset-lg-1">
					<div className="right-content">
						<div className="main_title">
							<h1>I love <br/>Travel and<br/> photography</h1>
							<p>The world without photography will be meaningless 
								to us if there is no light and color, 
								which opens up our minds and expresses passion.</p>
						</div>
						<div className="counter_area">
							<div className="top-two">
							
								<div className="single_counter">
									
									<div className="info-content">
										<h4>Travel</h4>
										<p>photography</p>
									</div>
								</div>
							
								<div className="single_counter">
									
									<div className="info-content">
										<h4>Event</h4>
										<p>photography</p>
									</div>
								</div>
							</div>

							<div className="bottom-two">
							
								<div className="single_counter">
									
									<div className="info-content">
										<h4>Wildlife</h4>
										<p>photography</p>
									</div>
								</div>
								
								<div className="single_counter">
									
									<div className="info-content">
										<h4>portrait</h4>
										<p>photography</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<section className="blog-area section_gap">
	<div className="container">
	<div className="row align-items-end justify-content-left">
				<div className="col-lg-5">
					<div className="main_title">
						<h1>Networking is <br/>key to knowledge</h1>
						<p>I would like to share my thoughts about many diffrent things.
							I beleave this will help me to improve myself as well as help others to improve treir knowledge
						</p>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
			<div className="col-lg-4 col-md-4 col-sm-6">
					<div className="single-blog">
						<div className="blog-thumb">
							<img className="img-fluid" src="/images/blog/h-blog1.jpg" alt=""/>
						</div>
						<div className="blog-details">
							<div className="blog-meta">
								<a href="#" className="m-gap"><span className="lnr lnr-calendar-full"></span>17th Jan</a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
							</div>
							<h5><a target="_blank" href="https://www.linkedin.com/pulse/flex-admin-sithila-waduge/">Flex admin</a></h5>
							<p>Flex admin is flexible admin panel for UI Development . 
								It is built on SASS Jquery and Angular technology . 
								You can use if for any platforms . purpose of this admin UI to 
								give more UX for users .</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-6">
					<div className="single-blog">
						<div className="blog-thumb">
							<img className="img-fluid" src="/images/blog/h-blog1.jpg" alt=""/>
						</div>
						<div className="blog-details">
							<div className="blog-meta">
								<a href="#" className="m-gap"><span className="lnr lnr-calendar-full"></span>18th Jan</a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
							</div>
							<h5><a target="_blank" href="https://www.linkedin.com/pulse/new-tesla-model3-ux-minimalism-laser-focus-sithila-waduge/">New Tesla Model3 UX with Minimalism And Laser focus</a></h5>
							<p>Tesla released their new brand Model3. It looks more clear User Experience. This will 
								remind us again and again Simplicity is the most powerful factor in UX 
								Interface designing.  Always when you simplify things you have to keep 
								most important thing in most appropriate places. You can Experience 
								this in new Tesla Model. Compare to previous User Interfaces in Tesla, 
								New one brings more improvements in User Experience. This is mostly 
								fallowed in Apple Concepts.</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 col-sm-6">
					<div className="single-blog">
						<div className="blog-thumb">
							<img className="img-fluid" src="img/blog/h-blog1.jpg" alt=""/>
						</div>
						<div className="blog-details">
							<div className="blog-meta">
								<a href="#" className="m-gap"><span className="lnr lnr-calendar-full"></span>18th Jan</a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span></a>
							</div>
							<h5><a target="_blank" href="https://medium.com/@sithila/my-views-of-design-and-how-to-design-6ac0bb932e70">My views of design and how to design</a></h5>
							<p>When things going on, species face problems and conflicts. 
								By discovering new designs they overcome those problems and 
								conflicts. Design is mainly defined as beautiful(better) 
								solution for problems and conflicts. Some designs save time 
								and make productive , some are make feel better. Beauty of 
								solution depends on satisfaction and usability, who ever interact 
								with those solutions. Great design needs to satisfy needs of users 
								( humans, animals, etc..).</p>
						</div>
					</div>
				</div>
			</div>
	</div>

	</section>





	<footer className="footer-area pb-5">
		<div className="container">
			<div className="row footer-top">
				<div className="col-lg-3  col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>About me</h6>
						<p>
						I am a UI/UX Engineer, Front-end Developer,Graphic Designer,
photographer and Researcher, who passionate about design
and developing User interface.
						</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>What i do</h6>
						<div className="row">
							<ul className="col footer-nav">
								<li><a href="index.html">UI / UX Design</a></li>
								<li><a href="services.html">Development</a></li>
								<li><a href="project.html">Photography</a></li>
							</ul>
							<ul className="col footer-nav">
								<li><a href="team-members.html">Branding</a></li>
								<li><a href="blog-single.html">Travel</a></li>
								
							</ul>
						</div>
					</div>
				</div>

				<div className="col-lg-3  col-md-6 col-sm-6">
					<div className="single-footer-widget">
						<h6>Drop your phone</h6>
						<p>We will get back to you with in 48 hours. submit your contact number</p>
						<div className="" id="mc_embed_signup">

							<form target="_blank"  action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
							 method="get" className="form-inline">

								<div className="d-flex flex-row">

									<input className="form-control" />


									<button className="click-btn btn btn-default">
										
									<i className="fas fa-align-center"></i>
									</button>
									<div style={{position: 'absolute', left: '-5000px'}}>
										<input />
									</div>
								</div>
								<div className="info"></div>
							</form>
						</div>
					</div>
				</div>
				<div className="col-lg-3  col-md-6 col-sm-6">
					<div className="single-footer-widget mail-chimp">
						<h6 className="mb-20">Social portfolios</h6>
						<ul className="instafeed d-flex flex-wrap">
							<li><a href={'https://www.linkedin.com/in/sithila/'} target="_blank"> <img  src="/images/linkedin.svg" alt=""/> </a></li>
							<li><a href={'https://www.behance.net/sithila'} target="_blank"> <img src="/images/behance.svg" alt=""/> </a></li>
							<li><img src="/images/instagram.svg" alt=""/></li>
							<li><img src="/images/shutterstock.svg" alt=""/></li>
							<li><img src="/images/facebook.svg" alt=""/></li>
							
						</ul>
					</div>
				</div>
			</div>
		</div>
		
	</footer>




	
						</div>
					</div>
					
				</div>
		  

			
			
		</div>
		
		<div className="page" id="page-docu">
					<div className="content">
                        
						<div className="demo p-5">
							<div className="scrollbar-inner">


							<section className="blog-area section_gap">
	<div className="container">
	<div className="row align-items-end justify-content-left">
				<div className="col-lg-5">
					<div className="main_title">
						<h1>My Portfolio <br/>Sithila sandaruwan</h1>
						<p>In my work I create visual concepts using diverse tools such as prototyping software, photography, animation and video. some of my designs listed here.</p>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
			
			<Lightbox
  images={
	[
		{
		src: '/images/portfolio1.jpg',
		title: 'image title',
		description: 'image description'
		},
		{
			src: '/images/portfolio2.png',
			title: 'image title',
			description: 'image description'
			},
			{
				src: '/images/design1.jpg',
				title: 'image title',
				description: 'image description'
				},
				{
					src: '/images/design3.png',
					title: 'image title',
					description: 'image description'
					},
					{
						src: '/images/design4.gif',
						title: 'image title',
						description: 'image description'
						},
						{
							src: '/images/design5.jpg',
							title: 'image title',
							description: 'image description'
							},
							{
								src: '/images/design2.gif',
								title: 'image title',
								description: 'image description'
								},
								{
									src: '/images/design6.jpg',
									title: 'image title',
									description: 'image description'
									}
	]
  }
  renderImageFunc={(idx, image, toggleLightbox, width, height) => {
    return (
		<div className="col-md-4">
			<span  className="img-gal">
							<div className="single-gallery-image">
							<img
			key={idx}
			src={image.src}
			className='img-circle'
			style={{width: width, height: height}}
			onClick={toggleLightbox.bind(null, idx)} />
							</div>
						</span>
			
		</div>
      
    )
  }}/>
			</div>
	</div>

	</section>
								


								</div>
							</div>
						</div>
		</div>

		<div className="page" id="page-manuals">
<div className="content">
                        
					<div className="demo">
						<div className="scrollbar-inner">
							
							
		<section className="blog-area section_gap">
	<div className="container">
	<div className="row align-items-end justify-content-left">
				<div className="col-lg-5">
					<div className="main_title">
						<h1>Blog articals </h1>
						<p>I would like to share my thoughts about many diffrent things. I beleave this will help me to improve 
							myself as well as help others to improve treir knowledge</p>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
			<div className="col-lg-4 col-md-4 col-sm-6">
					<div className="single-blog">
						<div className="blog-thumb">
							<img className="img-fluid" src="img/blog/h-blog1.jpg" alt=""/>
						</div>
						<div className="blog-details">
							<div className="blog-meta">
								<a href="#" className="m-gap"><span className="lnr lnr-calendar-full"></span>13th Dec</a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span>15</a>
								<a href="#" className="m-gap"><span className="lnr lnr-heart"></span>15</a>
							</div>
							<h5><a target="_blank" href="https://www.linkedin.com/pulse/flex-admin-sithila-waduge/">Flex admin</a></h5>
							<p>Flex admin is flexible admin panel for UI Development . 
								It is built on SASS Jquery and Angular technology . 
								You can use if for any platforms . purpose of this admin UI to 
								give more UX for users .</p>
						</div>
					</div>
				</div>
				
				
			</div>
	</div>

	</section>

	</div>
							</div>
							</div>


		</div>
		<div className="page" id="page-software">
		<div className="content">
                        
						<div className="demo">
							<div className="scrollbar-inner">
	
	
		
		<section className="home-banner-area relative">
			<div className="container-fluid">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="header-right col-lg-6 col-md-6">
					<div className="main_title">
					<h1>Branding graphic <br/>Designing </h1>
								<p>we help you to uplift your brand identity and attract more customers</p>
							</div>
						
						<a href="#" className="main_btn openportfolio">
							My portfolio
							<img src="/images/next.png" alt=""/>
						</a>
					</div>
	
					<div className="col-lg-6 col-md-6 header-left">
						<div className="">
							<img className="img-fluid w-100" src="/images/banner/graphic.jpg" alt=""/>
						</div>
						<div className="video-popup d-flex align-items-center">
							<a className="play-video video-play-button animate" href="https://www.youtube.com/watch?v=9TFx7TcFuoI" data-animate="zoomIn"
							 data-duration="1.5s" data-delay="0.1s">
								<span></span>
							</a>
							<div className="watch">
								<h5>Watch Intro Video</h5>
								<p>You will love our execution</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		</div>
		</div>
		</div>

		</div>
		<div className="page" id="page-custom">
		<div className="content">
                        
						<div className="demo">
							<div className="scrollbar-inner">
	
	
		
		<section className="home-banner-area relative">
			<div className="container-fluid">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="header-right col-lg-6 col-md-6">
					<div className="main_title">
					<h1>User experience <br/> Designing </h1>
								
								<p>User experience design is a popular business buzzword right now — 
									but what does it really mean? And how can your product benefit?</p>
								<p>We are hear to help you</p>
							</div>
						
						<a href="#" className="main_btn openportfolio">
							My portfolio
							<img src="/images/next.png" alt=""/>
						</a>
					</div>
	
					<div className="col-lg-6 col-md-6 header-left">
						<div className="">
							<img className="img-fluid w-100" src="/images/banner/design4.gif" alt=""/>
						</div>
						<div className="video-popup d-flex align-items-center">
							<a className="play-video video-play-button animate" href="https://www.youtube.com/watch?v=9TFx7TcFuoI" data-animate="zoomIn"
							 data-duration="1.5s" data-delay="0.1s">
								<span></span>
							</a>
							<div className="watch">
								<h5>Watch Intro Video</h5>
								<p>You will love our execution</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		</div>
		</div>
		</div>

		</div>
		<div className="page" id="page-training">
			<div className="content">
                        
						<div className="demo">
							<div className="scrollbar-inner">
	
	
		
		<section className="home-banner-area relative">
			<div className="container-fluid">
				<div className="row d-flex align-items-center justify-content-center">
					<div className="header-right col-lg-6 col-md-6">
					<div className="main_title">
					<h1>Photography <br/>and editing </h1>
								<p>The world without photography will be 
									meaningless to us if there is no light 
									and color, which opens up our minds and 
									expresses passion.</p>
							</div>
						
						<a href="#" className="main_btn openphotography">
							My portfolio
							<img src="/images/next.png" alt=""/>
						</a>
					</div>
	
					<div className="col-lg-6 col-md-6 header-left">
						<div className="">
							<img className="img-fluid w-100" src="/images/banner/photohraphy.jpg" alt=""/>
						</div>
						<div className="video-popup d-flex align-items-center">
							<a className="play-video video-play-button animate" href="https://www.youtube.com/watch?v=9TFx7TcFuoI" data-animate="zoomIn"
							 data-duration="1.5s" data-delay="0.1s">
								<span></span>
							</a>
							<div className="watch">
								<h5>Watch Intro Video</h5>
								<p>You will love our execution</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section className="blog-area section_gap ">
	<div className="container">
	<div className="row align-items-end justify-content-left">
				<div className="col-lg-5">
					<div className="main_title">
						<h1>My photography </h1>
						<p>Photography is a way of feeling, of touching, 
							of loving. What you have caught on film is 
							captured forever… It remembers little things, 
							long after you have forgotten everything.</p>
					</div>
				</div>
			</div>

			<div className="row justify-content-center pb-5">
			
			<Lightbox
  images={
	[
		{
		src: 'https://image.shutterstock.com/z/stock-photo-tiger-bath-at-dehiwala-tiger-in-water-hunting-focus-1503695987.jpg',
		title: 'image title',
		description: 'image description'
		},
		{
			src: 'https://image.shutterstock.com/z/stock-photo-landscape-scenery-of-waterfall-and-mountain-view-st-clair-s-waterfalls-sri-lanka-1577901712.jpg',
			title: 'image title',
			description: 'image description'
			},
			{
				src: '/images/photography/2.jpg',
				title: 'image title',
				description: 'image description'
				},
				{
					src: '/images/photography/3.jpg',
					title: 'image title',
					description: 'image description'
					},
					{
						src: '/images/photography/4.jpg',
						title: 'image title',
						description: 'image description'
						},
						{
							src: '/images/photography/5.jpg',
							title: 'image title',
							description: 'image description'
							},
							{
								src: '/images/photography/6.jpg',
								title: 'image title',
								description: 'image description'
								},
								{
									src: '/images/photography/7.jpg',
									title: 'image title',
									description: 'image description'
									},
									{
										src: '/images/photography/8.jpg',
										title: 'image title',
										description: 'image description'
										},
										{
											src: '/images/photography/9.jpg',
											title: 'image title',
											description: 'image description'
											}
	]
  }
  renderImageFunc={(idx, image, toggleLightbox, width, height) => {
    return (
		<div className="col-md-4">
			<span  className="img-gal">
							<div className="single-gallery-image">
							<img
			key={idx}
			src={image.src}
			className='img-circle'
			style={{width: width, height: height}}
			onClick={toggleLightbox.bind(null, idx)} />
							</div>
						</span>
			
		</div>
      
    )
  }}/>
			</div>
	</div>

	</section>


		</div>
		</div>
		</div>
		</div>
		<div className="page" id="page-buy">
			<header className="bp-header cf">
				<h1 className="bp-header__title">Where to buy</h1>
				<p className="bp-header__desc">Based on Ilya Kostin's Dribbble shot <a href="https://dribbble.com/shots/2286042-Stacked-navigation">Stacked navigation</a></p>
				<p className="info">
					"When people ask me why I don't eat meat or any other animal products, I say, 'Because they are unhealthy and they are the product of a violent and inhumane industry.'" &mdash;
				</p>
			</header>
			<img className="poster" src="/images/6.jpg" alt="img06" />
		</div>
		<div className="page" id="page-blog">
			<header className="bp-header cf">
				<h1 className="bp-header__title">Blog &amp; News</h1>
				<p className="bp-header__desc">Based on Ilya Kostin's Dribbble shot <a href="https://dribbble.com/shots/2286042-Stacked-navigation">Stacked navigation</a></p>
				<p className="info">
					"The question is not, 'Can they reason?' nor, 'Can they talk?' but rather, 'Can they suffer?" &mdash; Jeremy Bentham
				</p>
			</header>
			<img className="poster" src="images/1.jpg" alt="img01" />
		</div>
		<div className="page" id="page-contact">
		<div className="content">
                        
						<div className="demo">
							<div className="scrollbar-inner">


							<section className="home-banner-area common-banner relative">
        <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="header-right col-lg-6 col-md-6">
                    <h1>
                        Contact Us
                    </h1>
                    <p className="pt-20">
					We’re here to help and answer any question you 
					might have. We look forward to hearing from you
                    </p>
                    <div className="page-link-wrap">
                        <div className="page_link">
                            <a href="index.html">Home</a>
                            <a href="contact.html">Contact</a>
                        </div>
                        <img src="img/next.png" alt=""/>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 header-left">
                    <div className="">
                        <img className="img-fluid w-100" src="/images/banner/banner-img1.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </section>


	<section className="contact_area section_gap">
        <div className="container">
            <div id="mapBox" className="mapBox" data-lat="40.701083" data-lon="-74.1522848" data-zoom="13" data-info="PO Box CT16122 Collins Street West, Victoria 8007, Australia."
                data-mlat="40.701083" data-mlon="-74.1522848">
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="contact_info">
                        <div className="info_item">
                            <i className="lnr lnr-home"></i>
                            <h6>Colombo, Sri lanka</h6>
                            <p>Homagama </p>
                        </div>
                        <div className="info_item">
                            <i className="lnr lnr-phone-handset"></i>
                            <h6><a href="#">00 (94) 7157 24257</a></h6>
                            <p>Mon to Fri 6pm to 10 pm</p>
							<p>Sat to Sun 24 hours</p>
                        </div>
                        <div className="info_item">
                            <i className="lnr lnr-envelope"></i>
                            <h6><a href="#">sithila123@gmail.com</a></h6>
                            <p>Send us your query anytime!</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    

				<form action="#" className="row contact_form">
				<div className="col-md-6">
				<div className="form-group">
					<input type="text" id="fname" className="form-control" name="firstname" placeholder="Your name.."   onChange={e => this.setState({ fname: e.target.value })} />
                </div>
				<div className="form-group">
				<input type=" text" id="lname" className="form-control" name="lastname" placeholder="Your last name.."  onChange={e => this.setState({ lname: e.target.value })} />
                </div>
				<div className="form-group">
				<input type="email" id="email" className="form-control" name="email" placeholder="Your email"  onChange={e => this.setState({ email: e.target.value })} />
                </div>

				</div>
				<div className="col-md-6">
				<div className="form-group">
				<textarea id="message" name="message" className="form-control" placeholder="Write something.." onChange={e => this.setState({ message: e.target.value })} ></textarea>
                </div>
				</div>

				<div className="col-md-12 text-right">
                            <button type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" className="main_btn">
                                Send Message
                                <img src="img/next.png" alt=""/>
                            </button>
                        </div>

  
</form >
<div>
  
</div>






                </div>
            </div>
        </div>
    </section>









							</div>
						</div>
		</div>
		</div>
	</div>
	
	<button className="menu-button"><span>Menu</span></button>
	<div className="logo">
			<a href="index.html">
				<img src="/images/logo.png" alt=""/>
			</a>
		</div>
  </React.Fragment>
        );
    }
}

declare let module: object;

export default hot(module)(App);

