import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Brew, Bean } from '../../types'

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  h1: { fontSize: 18, marginBottom: 8 },
  row: { marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #ddd' }
})

function BrewsDoc({ brews, beans }: { brews: Brew[], beans: Bean[] }) {
  const beanName = (id: string) => beans.find(b=>b.id===id)?.name ?? 'Unknown'
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Brew Journal Export</Text>
        {brews.map((br, i) => (
          <View key={i} style={styles.row}>
            <Text>{beanName(br.beanId)} — {br.method} — {br.date}</Text>
            <Text>Dose {br.doseG}g, Water {br.waterG}g, Temp {br.tempC ?? '-'}°C, Time {br.timeSec ?? '-'}s, Ratio {br.ratio ?? '-'}</Text>
            <Text>Rating: {br.rating ?? '-'}</Text>
            {br.notes ? <Text>Notes: {br.notes}</Text> : null}
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default function PDFExportDialog({ brews, beans }:{ brews: Brew[], beans: Bean[] }) {
  return (
    <PDFDownloadLink document={<BrewsDoc brews={brews} beans={beans} />} fileName="brews.pdf" className="btn">
      {({ loading }) => loading ? 'Preparing PDF…' : 'Download PDF'}
    </PDFDownloadLink>
  )
}
