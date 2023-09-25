import Link from "next/link";

import type { Booklist } from "@/lib/database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UserBooklists: React.FC<{
  booklists: Booklist[];
}> = ({ booklists }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Booklist</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {booklists.map((booklist) => (
            <TableRow key={`booklist-${booklist.id}`}>
              <TableCell className="w-[100px]">{booklist.id}</TableCell>
              <TableCell>
                <Link href={`/booklist/${booklist.id}`}>{booklist.title}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
