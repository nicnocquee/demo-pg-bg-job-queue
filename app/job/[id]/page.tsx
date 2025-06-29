import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getJobQueue } from "@/lib/queue";
import { notFound } from "next/navigation";

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const jobQueue = await getJobQueue();
  const job = await jobQueue.getJob(Number(id));
  if (!job) {
    notFound();
  }
  const events = await jobQueue.getJobEvents(Number(id));
  return (
    <div className="p-4">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(job).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{JSON.stringify(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.event_type}</TableCell>
              <TableCell>{event.created_at.toISOString()}</TableCell>
              <TableCell>{JSON.stringify(event.metadata)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobPage;
