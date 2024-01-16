import { useParams } from 'react-router';
import { CompanyProfile } from '../../company';
import { useEffect, useState } from 'react';
import { GetCompanyProfile } from '../../Api';
import Sidebar from '../../components/sidebar/Sidebar';
import CompanyDashboard from '../../components/company/company-dashboard/CompanyDashboard';
import Tile from '../../components/tile/TIle';

interface Props {}

const CompanyPage: React.FC<Props> = () => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await GetCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);
  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard>
            <Tile title="Company Name" subTitle={company.companyName} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company not found!</div>
      )}
    </>
  );
};

export default CompanyPage;
