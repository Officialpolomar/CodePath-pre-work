
import { useParams, Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {supabase} from '../../client'
import { Typography } from '@mui/material';


type Creator = {
id: number;
Name: string;
URL: string;
Description: string;
imageURL: string;
}

function ViewCreators()
{

const params = useParams();
const id = params.id;

const navigate = useNavigate()
const [creator, setCreator] = useState<Creator | null>(null);

useEffect(() => {
  async function getCreator() 
  {
    const {data, error} = await supabase
    .from("Creators")
    .select("*")
    .eq("id", id)
    .single();

    if (data) setCreator(data)
  }

  getCreator();
}, [id]);

async function deleteEntry () 
{
  const response = await supabase.from('Creators').delete().eq('id', id)
  console.log("Creator deleted successfully")
  navigate(`/`)

}

  if (!creator) return <div>Loading...</div>;

    return (
        <div style= {{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <h1>{creator.Name}</h1>

        <div style= {{border: '2px solid #333', padding: '20px', marginBottom: '20px', borderRadius: "8px", minHeight: '80px'}}> 

          <p>{creator.Description}</p>
        </div>

        <div style= {{border: '2px solid #333', padding: '20px', marginBottom:'20px', borderRadius: '8px', minHeight: '80pxa'}}>
          <p>
          <strong>Creator URL:</strong>{' '}
          <a 
            href={creator.URL} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0066cc' }}
          >
            {creator.URL}
          </a>
        </p>
          </div>  

        {/* Image of Creator or Logo */}
        <div style= {{border: '2px solid #333', padding: '20px', marginBottom: '20px', borderRadius: "8px", minHeight: '80px'}}>  
          {creator.imageURL ? <img src={creator.imageURL} alt={creator.Name} width="150"/> : <Typography variant='h2'>No image given</Typography>}
          </div>
      

       {/* Edit and Delete Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '15px',
        marginTop: '30px'
      }}>
        <Link 
          to={`/edit/${id}`}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Edit Creator
        </Link>
        
        <button
          onClick = {deleteEntry}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Delete Creator
        </button>
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: '#0066cc' }}>
          ← Back to All Creators
        </Link>
      </div>


        </div>

      

    )
}

export default ViewCreators