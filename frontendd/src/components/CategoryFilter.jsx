import React from 'react';

// const categories = ['All', 'Indoor', 'Low Maintenance', 'Cactus'];
const categories = ['Plants', 'Plant Care','House Shape Plant',
  'Office Plant','Hanging Planter','Ceramic Pot and Plant'
];
const CategoryFilter = ({ category, setCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={category === cat ? 'active' : ''}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
