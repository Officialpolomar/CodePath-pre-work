import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

type Creator = {
  id: number;
  Name: string;
  URL: string;
  Description: string;
  imageURL: string;
};

function ShowCreators()
{
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCreators() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('Creators')
          .select('*');

        if (supabaseError) {
          setError(supabaseError.message);
          console.error('Error fetching creators:', supabaseError);
        } else {
          setCreators(data || []);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    getCreators();
  }, []);

    
    return (
       <div style={{marginTop: '10px' }}>  
          <h1>All Content Creators</h1>
          
          {error && (
            <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
              Error: {error}
            </div>
          )}

          {loading && <p>Loading creators...</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {creators.map((creator) => (
              <div >
              {/*Creator Name*/}
                <h4>{creator.Name}</h4>

                {/* Creator image */}
                <div key={creator.id} style={{ display: 'grid', border: '1px solid #ccc', padding: '20px', gap: '10px' }}>
                  {creator.imageURL ? 
                  <img src={creator.imageURL} alt={creator.Name} width="150"/> : 
                  <img src={"https://picsum.photos/id/1/200/200"} alt={creator.Name} width="150"/>
                }
                {/* Bottom links */ }
                  <div>
                    <Link to={`/view/${creator.id}`}>View Creator</Link>
                    {'  |  '}
                    <Link to={`/edit/${creator.id}`}>Edit</Link>
                   </div>
                </div>
              </div>
              ))}
            </div>
          
          <Button variant="contained" href="/add" sx = {{margin: "20px"}}>Add a Creator!!</Button>
       </div>
    );
}

export default ShowCreators