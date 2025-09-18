# MongoDB Setup and Data Import Guide

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Test MongoDB connection**:
   ```bash
   node scripts/test-connection.js
   ```

3. **Import sample pet data**:
   ```bash
   npm run seed
   ```

4. **Start the application**:
   ```bash
   npm run dev
   ```

5. **View imported pets**: Visit [http://localhost:3000/pets](http://localhost:3000/pets)

## Files Overview

### Data Files
- `sample_pet_data.json` - 20 sample pet records ready for import
- `pet_data_schema.json` - Complete MongoDB schema documentation

### Scripts
- `scripts/seed-pets.js` - Main database seeding script
- `scripts/test-connection.js` - MongoDB connection test
- `scripts/test-db-connection.js` - Alternative connection test

### Documentation
- `mongodb_import_guide.md` - Comprehensive import methods guide
- `MONGODB_SETUP.md` - This setup guide

## Environment Configuration

Ensure your `.env.local` file contains:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pet_adoption

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pet_adoption

# For MongoDB with authentication:
# MONGODB_URI=mongodb://username:password@localhost:27017/pet_adoption
```

## Sample Data Structure

The `sample_pet_data.json` contains 20 diverse pets with this structure:

```json
{
  "name": "Bella",
  "animal": "dog",
  "breed": "Labrador Mix",
  "age": 2,
  "medicalCondition": "Healthy, vaccinated. Up to date on all shots and spayed."
}
```

### Included Animals
- **Dogs**: 8 pets (Labrador Mix, Beagle, Golden Retriever, etc.)
- **Cats**: 6 pets (Tabby, Siamese, Maine Coon, Persian, etc.)
- **Birds**: 2 pets (Cockatiel, Canary)
- **Rabbits**: 2 pets (Mini Rex, Holland Lop)
- **Fish**: 2 pets (Betta, Goldfish)
- **Hamsters**: 2 pets (Syrian, Dwarf)

## Import Methods

### Method 1: NPM Script (Recommended)
```bash
npm run seed
```

### Method 1b: Simple Seeding (Alternative)
```bash
npm run seed:simple
```

### Method 2: Direct Node.js
```bash
node scripts/seed-pets.js
# OR (if you encounter module issues)
node scripts/simple-seed.js
```

### Method 3: MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to your database
3. Create/select `pet_adoption` database
4. Create/select `pets` collection
5. Import `sample_pet_data.json` as JSON Array

### Method 4: Command Line (mongoimport)
```bash
mongoimport --db pet_adoption --collection pets --file sample_pet_data.json --jsonArray
```

## Verification

After importing, verify the data:

### Using MongoDB Compass
- Browse to `pet_adoption` → `pets` collection
- Should see 20 documents

### Using MongoDB Shell
```javascript
// Connect to database
use pet_adoption

// Count documents
db.pets.countDocuments()
// Should return: 20

// View sample pets
db.pets.find().limit(5)

// Group by animal type
db.pets.aggregate([
  { $group: { _id: "$animal", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

### Using the Application
1. Start development server: `npm run dev`
2. Visit: [http://localhost:3000/pets](http://localhost:3000/pets)
3. Test API: [http://localhost:3000/api/pets](http://localhost:3000/api/pets)

## Troubleshooting

### Connection Issues

**Error**: `MongoServerSelectionError`
- ✅ Ensure MongoDB is running
- ✅ Check `MONGODB_URI` in `.env.local`
- ✅ Verify network connectivity
- ✅ Check firewall settings

**Error**: `Authentication failed`
- ✅ Verify username/password in connection string
- ✅ Check user permissions in MongoDB

### Import Issues

**Error**: `ValidationError`
- ✅ Check data format matches Pet model schema
- ✅ Ensure required fields are present
- ✅ Verify data types (age should be number, etc.)

**Error**: `Pet.countDocuments is not a function`
- ✅ This indicates ES6 module import issues
- ✅ Use the simple seeding script: `npm run seed:simple`
- ✅ Ensure `"type": "module"` is in package.json

**Issue**: Data imported to wrong database (e.g., `test` instead of `pet-adoption`)
- ✅ Check your `MONGODB_URI` in `.env.local`
- ✅ Ensure it ends with `/pet-adoption` (e.g., `mongodb://localhost:27017/pet-adoption`)
- ✅ Re-run the seeding script after fixing the connection string

**Error**: `File not found`
- ✅ Ensure `sample_pet_data.json` exists in project root
- ✅ Check file path in script

### Application Issues

**Empty pet list on website**
- ✅ Verify data was imported successfully
- ✅ Check API endpoint: `/api/pets`
- ✅ Review browser console for errors
- ✅ Check Next.js server logs

## Database Schema

The Pet model includes these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Pet's name (max 50 chars) |
| animal | String | Yes | Type: dog, cat, bird, rabbit, fish, hamster |
| breed | String | Yes | Pet's breed (max 50 chars) |
| age | Number | Yes | Age in years (0-30) |
| medicalCondition | String | No | Health status and notes |
| createdAt | Date | Auto | Record creation timestamp |
| updatedAt | Date | Auto | Record update timestamp |

## Next Steps

1. **Import the data** using your preferred method
2. **Test the application** to ensure pets display correctly
3. **Add more data** by creating additional JSON files
4. **Customize the schema** by modifying `src/lib/models/Pet.js`
5. **Set up production database** for deployment

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Atlas (Cloud)](https://www.mongodb.com/cloud/atlas)

---

**Need help?** Check the detailed guide in `mongodb_import_guide.md` or review the Pet model in `src/lib/models/Pet.js`.