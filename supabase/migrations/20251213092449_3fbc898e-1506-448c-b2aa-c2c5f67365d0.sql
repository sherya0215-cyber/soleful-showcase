-- Drop existing insert policy (there isn't one, but this ensures clean state)
-- Create a policy that only allows admins to insert new admin users
CREATE POLICY "Only admins can add admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));