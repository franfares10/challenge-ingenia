import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BannerImage from '../assets/banner.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFetch } from '../hooks/useFetch';
import { IProduct } from '../interfaces/IProduct';
import { ICategory } from '../interfaces/ICategory';

const HomePage = () => {
  const { data: featuredProducts } = useFetch<{
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
  }>(`/products?limit=${3}`);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<ICategory[]>(`/products/categories`);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='max-w-screen-xl mx-auto px-4'>
      <Helmet>
        <title>Tienda Online</title>
        <meta name='description' content='Bienvenido a nuestra tienda online' />
      </Helmet>
      <div className='relative mb-8'>
        <img
          src={BannerImage}
          alt='Banner principal'
          className='w-full h-auto rounded-lg'
        />
        <div className='absolute inset-0 bg-black opacity-40 rounded-lg'></div>
        <div className='absolute inset-0 flex items-center justify-center text-white text-center'>
          <div>
            <h1 className='text-xl md:text-6xl font-bold mb-4'>
              Bienvenido a nuestra tienda
            </h1>
            <p className='text-md md:text-xl'>
              Encuentra productos exclusivos para ti
            </p>
          </div>
        </div>
      </div>
      <section className='mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>
          Productos Destacados
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {featuredProducts?.products.map(product => (
            <div
              key={product.id}
              className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300'
            >
              <Link to={`/items/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className='w-full h-auto object-cover'
                />
                <div className='p-4 bg-white'>
                  <h3 className='text-lg font-semibold mb-2'>
                    {product.title}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className='mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>
          Explora nuestras categorías
        </h2>
        {categoriesLoading ? (
          <p>Cargando categorías...</p>
        ) : categoriesError ? (
          <p>Ocurrió un error al cargar las categorías</p>
        ) : (
          <Slider {...carouselSettings}>
            {categories?.map(category => (
              <div className='p-4 group bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300'>
                <h3 className='text-lg font-semibold mb-2'>{category.name}</h3>
                <p className='text-sm text-gray-600'>
                  Descubre nuestros productos{' '}
                  <Link
                    key={category.slug}
                    to={`/items/category/${category.slug}`}
                    className='font-bold text-blue-500'
                  >
                    Aquí
                  </Link>
                </p>
              </div>
            ))}
          </Slider>
        )}
      </section>
    </div>
  );
};

export default HomePage;
