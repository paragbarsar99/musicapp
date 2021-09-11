//   <StatusBar backgroundColor="#121212" />
//       <SafeAreaView style={{ flex: 1 }}>
//         <SectionList
//           contentContainerStyle={{ paddingHorizontal: 10 }}
//           stickySectionHeadersEnabled={false}
//           sections={state}
//           renderSectionHeader={({ section }) => (
//     <>
//       <Text style={styles.sectionHeader}>{data.title}</Text>
//       {section.horizontal ? (
//         <FlatList
//           horizontal
//           data={data}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => <ListItem item={item} />}
//           showsHorizontalScrollIndicator={false}

//         />
//       ) : null}
//     </>
//   )}
//           renderItem={({ item, section }) => {
//             if (section.horizontal) {
//               return null;
//             }
//             return <ListItem item={item} />;
//           }}
//         />
//       </SafeAreaView>