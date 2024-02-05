export const countriesCarouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 11,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 11,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 9,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 7,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 5,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 4,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: false,
      },
    },
  ],
};

export const SuggestedProductsCarouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        dots: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        dots: false,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        dots: false,
      },
    },
  ],
};

export const ProviderCarouselSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 11,
  slidesToScroll: 2,
  arrows: false,
  swipeToSlide: true,
  dots: true,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 11,
        slidesToScroll: 3,
        dots: true,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 9,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 7,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 5,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 4,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
      },
    },
  ],
};
