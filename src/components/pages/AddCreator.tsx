import { useState } from 'react';
import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';

type Creator = {
  Name: string;
  URL: string;
  Description: string;
  imageURL: string;
};

function AddCreators()
{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Creator>({
    Name: '',
    URL: '',
    Description: '',
    imageURL: ''
  });
   
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('Creators')
        .insert([formData])
        .select();

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Error inserting creator:', supabaseError);
      } else {
        console.log('Creator added successfully:', data);
        // Reset form
        setFormData({
          Name: '',
          URL: '',
          Description: '',
          imageURL: ''
        });
        // Navigate back to home
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1>Add a New Creator</h1>
          
          {error && (
            <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div>
              <label htmlFor="Name">Creator Name: 
                <input 
                  type="text" 
                  id="name"
                  name="Name"
                  value={formData.Name} 
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
            </div>

            <div>
              <label htmlFor="URL">Creator URL: 
                <input 
                  type="url" 
                  id="URL"
                  name="URL"
                  value={formData.URL} 
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
            </div>

            <div>
              <label htmlFor="Description">Description: 
                <textarea 
                  id="Description"
                  name="Description"
                  value={formData.Description} 
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
            </div>

            <div>
              <label htmlFor="imageURL">Image URL: 
                <input 
                  type="url" 
                  id="imageURL"
                  name="imageURL"
                  value={formData.imageURL} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '10px',
                backgroundColor: loading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Adding Creator...' : 'Add Creator'}
            </button>
          </form>
        </div>
    )
}
export default AddCreators