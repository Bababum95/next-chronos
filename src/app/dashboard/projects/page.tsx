import { Header } from '@/components/layouts/Header';
import { ProjectsTable } from '@/features/projects';

export default function Projects() {
  return (
    <>
      <Header breadcrumb={{ current: 'Projects' }} />
      <div className="px-4 py-4 grid gap-4">
        <ProjectsTable />
      </div>
    </>
  );
}
