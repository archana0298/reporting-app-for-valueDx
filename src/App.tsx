import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import AnalysisTable from './components/AnalysisTable';
import useResponsive from './hooks/useResponsive';
import { analysisData } from './data/mockData';
import { getMetricsData } from './utils/getMetricsData';
import BarChartCard from './components/Charts/BarChartCard';
import PieChartCard from './components/Charts/PieChartCard';

const { Content, Sider } = Layout;

function App() {
  const { collapsed, setCollapsed } = useResponsive();
  const metricsData = getMetricsData(analysisData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout className="min-h-screen">
        <Sider
          collapsed={collapsed}
          width={256}
          collapsedWidth={80}
          className="bg-white shadow-lg fixed left-0 top-0 h-full z-10"
          style={{
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <Sidebar collapsed={collapsed} />
        </Sider>

        <Layout
          className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'
            }`}
        >
          <Content className="p-2 bg-slate-50">
            <div className="mb-0.5">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="mb-4 text-gray-600 hover:text-gray-800 lg:hidden"
              />
            </div>

            <Header />

            <div className="space-y-6">
              <div>
                <div className="mb-1">
                  {/* <h2 className="text-xl font-semibold text-gray-800 mb-1">Report</h2> */}
                  <p className="text-sm text-gray-500">
                    Here you can track your expenses and analyze reports efficiently.
                  </p>
                </div>

                <MetricsCards data={metricsData} />
              </div>
              <div className="p-0.1 grid grid-cols-2 gap-4 mb-0">
                <BarChartCard />
                <PieChartCard />
              </div>

              <AnalysisTable data={analysisData} />

            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;