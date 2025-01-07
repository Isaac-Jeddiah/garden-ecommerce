import React, { useState } from 'react';
import PlantCard from '../components/PlantCard';
import CategoryFilter from '../components/CategoryFilter';

const plantsData = [
  { id: 1, name: 'Fiddle Leaf Fig', category: 'Indoor', price: 20 },
  { id: 2, name: 'Snake Plant', category: 'Low Maintenance', price: 15 },
  { id: 3, name: 'Monstera', category: 'Indoor', price: 25 },
  { id: 4, name: 'Succulent', category: 'Cactus', price: 10 },
];

const Shop = () => {
  const [category, setCategory] = useState('All');

  const filteredPlants = category === 'All' 
    ? plantsData 
    : plantsData.filter(plant => plant.category === category);

  return (
    <div className="shop">
      <CategoryFilter category={category} setCategory={setCategory} />
      <div className="plants-grid">
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
