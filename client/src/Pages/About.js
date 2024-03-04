import React from 'react'
import Layout from '../Components/layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - Imperial garments"}>
        <div className='row contactus'>
          <div className='col-md-6'>
            <img
              src={'/images/about.jpeg'}
              alt='contactus'
              style={{width: '100%'}}
              />
          </div>
          <div className='col-md-4'>
            <p className='text-justify mt-2'>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default About