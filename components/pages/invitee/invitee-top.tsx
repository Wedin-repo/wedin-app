import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

type InviteeTopProps = {
  eventUrl: string | null;
};

const InviteeTop = ({ eventUrl }: InviteeTopProps) => {
  return (
    <div className="w-full flex justify-between py-4 border-b border-Gray200">
      <div className="flex items-center ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-base hover:opacity-70 transition-all">
                <Link href="/dashboard">Mi lista</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-base">
                Previsualización de lista
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="bg-Primary700 text-white rounded-full">
        <Button variant="publishButton">Publicar lista</Button>
      </div>
    </div>
  );
};

export default InviteeTop;
