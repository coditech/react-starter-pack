import React from 'react';
import Default from '../Wrappers/Default'

const TeamMember = ({ src, name }) => (
  <div>
    <article class="card">
      <img alt={'a photo of '+name} src="/web/img/forest.jpg"/>
      <footer>
        <h3>{name}</h3>
        <button>Like</button>
      </footer>
    </article>
  </div>
)

const About = () => (
  <Default title='about'>
    <article>
      <h1>About</h1>
      <p>Lorem Ipsum Dolores Amet</p>
    </article>
    <article>
      <h2>Our Team</h2>
      <section className="flex three five-800">
          <TeamMember src='' name='Jad'/>
          <TeamMember src='' name='Jad'/>
          <TeamMember src='' name='Jad'/>
          <TeamMember src='' name='Jad'/>
          <TeamMember src='' name='Jad'/>
          <TeamMember src='' name='Jad'/>
      </section>
    </article>
  </Default>
)
export default About;
