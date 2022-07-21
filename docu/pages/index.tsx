import Head from 'next/head'
import Image from 'next/image'
import 'typeface-roboto';
import Carousels from './components/Home/Carousesl';
import Categories from './components/Home/Categories';
import LatestNews from './components/Home/LatestNews';
export default function Home() {
  return (
  <>
    <Carousels/>
    <Categories />
    <LatestNews />
    </>
  )
}
