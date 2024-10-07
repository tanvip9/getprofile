import { useState } from 'react';
import Portfolio from '@/components/shared/Portfolio';
import SectionTitle from '@/components/shared/SectionTitle';
import { works } from '@/data/works';
import Link from 'next/link';

const RecentWorkSection = () => {
  const [sortOption, setSortOption] = useState('title'); // Default sorting option by title

  // Define custom category order
  const categoryOrder = ['iOS', 'Web Development', 'Cloud', 'AI/ML'];

  // Function to handle sorting
  const sortedWorks = [...works].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'category') {
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    }
    return 0;
  });

  return (
    <>
      <SectionTitle>Recent Works</SectionTitle>
      
      {/* Sorting dropdown */}
      <div className="mt-4 flex justify-end">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div className="mt-10 grid gap-4 xs:grid-cols-2 md:grid-cols-3 md:gap-8">
        {sortedWorks
          .filter((_, index) => index < 6)
          .map((work) => (
            <Portfolio
              key={work.id}
              imageUrl={work.thumbnailUrl}
              category={work.category}
              title={work.title}
              href={`/works/${work.id}`}
            />
          ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={'/works'}>
          <a className="btn">View All</a>
        </Link>
      </div>
    </>
  );
};

export default RecentWorkSection;
