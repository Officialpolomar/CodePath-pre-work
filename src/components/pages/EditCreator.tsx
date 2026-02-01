import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../client'

type Creator = {
  id: number;
  Name: string;
  URL: string;
  Description: string;
  imageURL: string;
};


function EditCreator() {
  const { id } = useParams<{ id: string }>();

  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Creator>({
    id: 0,
    Name: '',
    URL: '',
    Description: '',
    imageURL: ''
  });

  // Fetch existing creator data
  useEffect(() => {
    async function getCreator() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('Creators')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) {
          setError(supabaseError.message);
          console.error('Error fetching creator:', supabaseError);
        } else if (data) {
          setFormData(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getCreator();
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('Creators')
        .update({
          Name: formData.Name,
          URL: formData.URL,
          Description: formData.Description,
          imageURL: formData.imageURL
        })
        .eq('id', formData.id)
        .select();

      if (supabaseError) {
        setError(supabaseError.message);
        console.error('Error updating creator:', supabaseError);
      } else {
        console.log('Creator updated successfully');
        // Navigate back to view page
        navigate(`/`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading creator...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Creator</h1>

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
              id="Name"
              name="Name"
              value={formData.Name} 
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
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
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
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
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
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
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              backgroundColor: saving ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate(`/view/${formData.id}`)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#757575',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCreator