# Storage Setup for Avatar Images

## Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the sidebar
3. Click **Create bucket**
4. Set bucket name: `avatars`
5. Set as **Public bucket**: Yes
6. Click **Create bucket**

## Method 2: Using SQL (Alternative)

If you prefer to use SQL, run this in the SQL Editor after creating the core tables:

```sql
-- Insert bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;
```

## Storage Policies

After creating the bucket, run these policies in the SQL Editor:

```sql
-- Create storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own avatar" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own avatar" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'avatars' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

## File Structure

When uploading avatars, they will be stored with this structure:
```
avatars/
  └── {user_id}/
      └── avatar.jpg
```

The policies ensure users can only access their own avatar files.
