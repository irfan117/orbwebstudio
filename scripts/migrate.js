#!/usr/bin/env node

/**
 * Orb Web Studio Database Migration Script
 * 
 * This script handles the migration from old schema to comprehensive schema
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  try {
    log(`  ${description}...`, 'cyan');
    execSync(command, { stdio: 'inherit' });
    log(`  ✅ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`  ❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
}

function checkPrerequisites() {
  log('🔍 Checking prerequisites...', 'blue');
  
  // Check if Supabase CLI is installed
  try {
    execSync('supabase --version', { stdio: 'pipe' });
    log('✅ Supabase CLI found', 'green');
  } catch (error) {
    log('❌ Supabase CLI is not installed. Please install it first:', 'red');
    log('npm install -g supabase', 'yellow');
    process.exit(1);
  }
  
  // Check if we're in a Supabase project
  if (!fs.existsSync('supabase/config.toml')) {
    log('❌ Not in a Supabase project directory. Please run this from your project root.', 'red');
    process.exit(1);
  }
  
  log('✅ Prerequisites check passed', 'green');
}

function createBackup() {
  log('📦 Creating database backup...', 'blue');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupFile = `backup_${timestamp}.sql`;
  
  if (execCommand(`supabase db dump --file ${backupFile}`, 'Creating backup')) {
    log(`✅ Backup created: ${backupFile}`, 'green');
    return backupFile;
  } else {
    log('❌ Failed to create backup. Aborting migration.', 'red');
    process.exit(1);
  }
}

function resetDatabase() {
  log('🔄 Resetting database with new schema...', 'blue');
  
  if (execCommand('supabase db reset --linked', 'Resetting database')) {
    log('✅ Database reset successful', 'green');
  } else {
    log('❌ Database reset failed. Please check your connection.', 'red');
    process.exit(1);
  }
}

function applyMigrations() {
  log('📝 Applying migrations...', 'blue');
  
  const migrations = [
    {
      file: 'supabase/migrations/20250126000001_create_project_types.sql',
      description: 'Project types migration'
    },
    {
      file: 'supabase/migrations/20250126000002_comprehensive_schema.sql',
      description: 'Comprehensive schema migration'
    },
    {
      file: 'supabase/migrations/20250126000003_rpc_functions.sql',
      description: 'RPC functions migration'
    },
    {
      file: 'supabase/migrations/20250126000004_security_policies.sql',
      description: 'Security policies migration'
    }
  ];
  
  for (const migration of migrations) {
    if (!fs.existsSync(migration.file)) {
      log(`⚠️  Migration file not found: ${migration.file}`, 'yellow');
      continue;
    }
    
    if (!execCommand(`supabase db push --file ${migration.file}`, migration.description)) {
      log(`❌ Migration failed: ${migration.description}`, 'red');
      process.exit(1);
    }
  }
  
  log('✅ All migrations applied successfully', 'green');
}

function generateTypes() {
  log('📝 Generating TypeScript types...', 'blue');
  
  if (execCommand('supabase gen types typescript --linked > src/types/supabase.ts', 'Generating TypeScript types')) {
    log('✅ TypeScript types generated successfully', 'green');
  } else {
    log('⚠️  Warning: Failed to generate TypeScript types', 'yellow');
  }
}

function verifyDatabase() {
  log('🔍 Verifying database structure...', 'blue');
  
  if (execCommand('supabase db diff --schema public', 'Checking database structure')) {
    log('✅ Database structure verified', 'green');
  } else {
    log('⚠️  Warning: Database structure check failed', 'yellow');
  }
}

function testConnection() {
  log('🧪 Testing database connection...', 'blue');
  
  if (execCommand('supabase db ping', 'Testing connection')) {
    log('✅ Database connection successful', 'green');
  } else {
    log('❌ Database connection failed', 'red');
    process.exit(1);
  }
}

function updateImports() {
  log('📝 Updating import statements...', 'blue');
  
  const filesToUpdate = [
    'app/portfolio/page.tsx',
    'app/services/page.tsx',
    'app/admin/page.tsx',
    'src/components/sections/Portfolio/Portfolio.tsx',
    'src/components/sections/Services/Services.tsx'
  ];
  
  filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Update imports to use comprehensive types
      content = content.replace(
        /import.*from ['"]@\/types['"]/g,
        "import { Portfolio, Service, ProjectType } from '@/types/comprehensive'"
      );
      
      content = content.replace(
        /import.*from ['"]@\/lib\/supabase\/queries['"]/g,
        "import { portfolioQueries, serviceQueries, projectTypeQueries } from '@/lib/supabase/queries_comprehensive'"
      );
      
      fs.writeFileSync(file, content);
      log(`  ✅ Updated imports in ${file}`, 'green');
    }
  });
}

function showNextSteps() {
  log('', 'reset');
  log('🎉 Database migration completed successfully!', 'green');
  log('', 'reset');
  log('📋 Next steps:', 'blue');
  log('1. Update your imports to use comprehensive types:', 'yellow');
  log('   import { Portfolio, Service } from "@/types/comprehensive"', 'cyan');
  log('', 'reset');
  log('2. Update your queries to use comprehensive queries:', 'yellow');
  log('   import { portfolioQueries } from "@/lib/supabase/queries_comprehensive"', 'cyan');
  log('', 'reset');
  log('3. Test all features to ensure everything works correctly', 'yellow');
  log('', 'reset');
  log('4. Deploy to production when ready', 'yellow');
  log('', 'reset');
  log('🔗 Useful commands:', 'blue');
  log('   npm run migrate:reset    # Reset database', 'cyan');
  log('   npm run migrate:diff     # Check for changes', 'cyan');
  log('   npm run migrate:types    # Generate types', 'cyan');
  log('   npm run migrate:backup   # Create backup', 'cyan');
  log('', 'reset');
}

// Main migration function
async function main() {
  log('🚀 Starting Orb Web Studio Database Migration...', 'magenta');
  log('', 'reset');
  
  try {
    checkPrerequisites();
    const backupFile = createBackup();
    resetDatabase();
    applyMigrations();
    generateTypes();
    verifyDatabase();
    testConnection();
    updateImports();
    showNextSteps();
    
  } catch (error) {
    log(`❌ Migration failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  main();
}

module.exports = { main };
