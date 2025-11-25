import { getHistory } from '../../lib/history';
import { HistoryView } from '../../components/HistoryView';

export default async function HistoryPage() {
    const history = await getHistory();

    return (
        <main>
            <HistoryView history={history} />
        </main>
    );
}
