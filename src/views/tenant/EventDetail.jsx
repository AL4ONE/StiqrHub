import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  TextField,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import { BACKEND_URL } from "src/config/constants";
import { apiGet, apiPost } from "src/utils/api";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  // Ambil ID dari URL path langsung sebagai fallback
  const params = useParams();
  const id = params.id || window.location.pathname.split('/').pop();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        console.log("Event ID from URL:", id); // debug log
        
        // ambil semua event
        const data = await apiGet(BACKEND_URL + `/api/tenant/events`);
        console.log("API Response:", data); // debug log
        
        const list = Array.isArray(data) ? data : data?.data || [];
        console.log("Events list:", list); // debug log
        
        const ev = list.find((e) => String(e.id) === String(id)); // ubah jadi string comparison
        console.log("Found event:", ev); // debug log
        
        setEvent(ev || null);

        if (ev) {
          // ambil daftar event aktif tenant (yang udah register)
          const active = await apiGet(BACKEND_URL + `/api/tenant/events/active`);
          const activeList = Array.isArray(active) ? active : active?.data || [];
          const isRegistered = activeList.some((e) => String(e.id) === String(id));
          setHasRegistered(isRegistered);
        }
      } catch (e) {
        console.error("Error loading event:", e); // debug log
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isPerDay = event?.payment_method === "per_day";
  const canRegister = !isPerDay || (startDate && endDate);

  const register = async () => {
    if (!canRegister) return;
    setRegistering(true);
    setError("");
    try {
      const body = isPerDay ? { start_date: startDate, end_date: endDate } : undefined;
      const res = await apiPost(BACKEND_URL + `/api/tenant/events/${id}/register`, body);
      if (res?.status === "success") {
        alert("Registered successfully. Payment created with PENDING status.");
        setHasRegistered(true);
      } else {
        alert(res?.message || "Failed to register");
      }
    } catch (e) {
      alert("Failed to register");
    } finally {
      setRegistering(false);
    }
  };

  const handleClaim = () => {
    // Ganti jadi window.location untuk navigasi manual
    window.location.href = `/tenant/events/${id}/claim`;
  };

  const StatusChip = ({ value }) => {
    const color =
      value === "ACTIVE" ? "success" : value === "PUBLISHED" ? "primary" : "default";
    return <Chip label={value} color={color} />;
  };

  if (loading)
    return (
      <PageContainer title="Event Detail">
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  if (error)
    return (
      <PageContainer title="Event Detail">
        <Typography color="error">{error}</Typography>
      </PageContainer>
    );
  if (!event)
    return (
      <PageContainer title="Event Detail">
        <Typography>Event not found</Typography>
      </PageContainer>
    );

  return (
    <PageContainer title="Event Detail">
      <Card>
        <CardContent>
          <Typography variant="h4" mb={2}>
            {event.name}
          </Typography>
          <Box display="flex" gap={1} mb={2} alignItems="center">
            <StatusChip value={event.status} />
            <Chip label={event.payment_method} variant="outlined" />
            {event.insurance_active ? (
              <Chip label="Insurance Active" color="info" />
            ) : null}
          </Box>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {event.location}
          </Typography>
          <Typography variant="body2" mb={2}>
            {event.start_date} → {event.end_date}
          </Typography>
          <Typography variant="body2" mb={2}>
            Category: {event.category}
          </Typography>
          <Typography variant="body2" mb={2}>
            Booth Price: {event.booth_price || "Free"}
          </Typography>

          {isPerDay && !hasRegistered && (
            <Box mt={2} mb={1}>
              <Typography variant="subtitle1" mb={1}>
                Select your dates
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>
              <Typography variant="caption" color="textSecondary">
                Dates must be within event range: {event.start_date} to {event.end_date}
              </Typography>
            </Box>
          )}

          <Stack direction="row" spacing={1} mt={3}>
            {!hasRegistered ? (
              <Button
                variant="contained"
                onClick={register}
                disabled={registering || !canRegister}
              >
                {registering ? "Registering..." : "Register"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleClaim}
              >
                Claim
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
}