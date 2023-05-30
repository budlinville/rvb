interface HomeProps {
    
}
 
const Home = ({ }: HomeProps) => {
    return ( 
        <div>
            <h1>Home</h1>
            { [...new Array(100)].map( () => `
                Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            ).join('\n') }
        </div>
    );
}
 
export default Home;