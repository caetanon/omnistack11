import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { 
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import s from './styles';
import { Feather } from "@expo/vector-icons";
import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if(loading) {
      return;
    }

    if(total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);

    setLoading(false);
    setPage(page+1);
  }

  useEffect(() => {
    loadIncidents();
  }, [])


  return (
    <View style={s.container}>
      <View style={s.header}>
        <Image source={logoImg} />
        <Text style={s.headerText}>
          Total de <Text style={s.headerTextBold}>{total} Casos</Text>
        </Text>
      </View>

      <View style={s.content}>
        <Text style={s.title}>Bem Vindo!</Text>
        <Text style={s.description}>
          Escolha um dos casos abaixo e salve o dia.
        </Text>
      </View>

      <FlatList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        style={s.incidentList}
        renderItem={({ item: incident }) => (
          <View style={s.incident}>
            <Text style={s.incidentProperty}>ONG:</Text>
            <Text style={s.incidentValue}>{incident.id}</Text>

            <Text style={s.incidentProperty}>CASO:</Text>
            <Text style={s.incidentValue}>{incident.title}</Text>

            <Text style={s.incidentProperty}>Valor:</Text>
            <Text style={s.incidentValue}>{
              Intl.NumberFormat(
                'pt-BR', 
                {style: 'currency', currency: 'BRL'}
                ).format(incident.value)
              }
            </Text>

            <TouchableOpacity
              style={s.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={s.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={17} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}