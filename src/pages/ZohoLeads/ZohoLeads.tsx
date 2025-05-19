import { useGetZohoLeadsQuery } from '../../services/zohoLead';
import { Card, CardContent } from '../../components/ui/Card';

export default function ZohoLeads() {
  const { data: leads, isLoading, error } = useGetZohoLeadsQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Zoho CRM Leads</h1>

      {isLoading ? (
        <div>loading...</div>
      ) : error ? (
        <p className="text-red-500">Failed to load leads.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads?.map((lead:any, i:number) => (
            <Card key={i}>
              <CardContent className="space-y-2 p-4">
                <p><strong>Name:</strong> {lead.First_Name} {lead.Last_Name}</p>
                <p><strong>Email:</strong> {lead.Email}</p>
                <p><strong>Phone:</strong> {lead.Phone || 'N/A'}</p>
                <p><strong>Company:</strong> {lead.Company || 'N/A'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
