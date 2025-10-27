-- Create project_types table
CREATE TABLE IF NOT EXISTS project_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#3FA9F5',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default project types
INSERT INTO project_types (name, description, icon, color, sort_order) VALUES
('Web App', 'Aplikasi web interaktif dengan fitur dinamis', 'Globe', '#3FA9F5', 1),
('E-commerce', 'Toko online dengan sistem pembayaran', 'ShoppingCart', '#C6A664', 2),
('Corporate', 'Website perusahaan dengan informasi lengkap', 'Building', '#3FA9F5', 3),
('Landing Page', 'Halaman tunggal untuk konversi tinggi', 'Target', '#C6A664', 4),
('Mobile App', 'Aplikasi mobile responsive', 'Smartphone', '#3FA9F5', 5),
('Blog', 'Website blog dengan CMS', 'BookOpen', '#C6A664', 6)
ON CONFLICT (name) DO NOTHING;

-- Note: portfolios table will be created in the comprehensive schema migration
-- Foreign key will be added there as well
CREATE INDEX IF NOT EXISTS idx_project_types_active ON project_types(is_active);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_types_updated_at 
    BEFORE UPDATE ON project_types 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
