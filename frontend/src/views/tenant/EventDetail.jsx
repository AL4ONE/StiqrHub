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
  const params = useParams();
  const id = params.id || window.location.pathname.split("/").pop();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching event id:", id);
        const data = await apiGet(`${BACKEND_URL}/api/tenant/events/${id}`);
        const ev = data?.data || null;
        setEvent(ev);

        if (ev) {
          const active = await apiGet(`${BACKEND_URL}/api/tenant/events/active`);
          const activeList = Array.isArray(active)
            ? active
            : active?.data || [];
          const isRegistered = activeList.some(
            (e) => String(e.id) === String(id)
          );
          setHasRegistered(isRegistered);
        }
      } catch (e) {
        console.error("Error loading event:", e);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isPerDay = event?.payment_method === "per_day";
  const canRegister = !isPerDay || (startDate && endDate);

  // Price preview breakdown (mirrors backend calculation)
  const platformFee = 5000;
  const insuranceFee = event?.insurance_active ? 10000 : 0;
  const selectedDays = (() => {
    if (!event) return 0;
    if (!isPerDay) return 1;
    if (!startDate || !endDate) return 0;
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const ms = e.getTime() - s.getTime();
      const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(0, days);
    } catch { return 0; }
  })();
  const boothSubtotal = (() => {
    if (!event) return 0;
    const unit = event.booth_price || 0;
    return isPerDay ? unit * (selectedDays || 0) : unit;
  })();
  const totalPreview = boothSubtotal + platformFee + insuranceFee;

  const register = async () => {
    if (!canRegister) return;
    try {
      setRegistering(true);
      const body = isPerDay
        ? { start_date: startDate, end_date: endDate }
        : undefined;
      const res = await apiPost(
        `${BACKEND_URL}/api/tenant/events/${id}/register`,
        body
      );
      if (res?.status === "success") {
        alert("Registered successfully! Payment pending.");
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
    window.location.href = `/tenant/events/${id}/claim`;
  };

  const StatusChip = ({ value }) => {
    const color =
      value === "ACTIVE"
        ? "success"
        : value === "PUBLISHED"
        ? "primary"
        : "default";
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
          {(event?.banner_url || event?.banner) && (
            <Box
              mb={2}
              sx={{
                width: "100%",
                height: 260,
                overflow: "hidden",
                borderRadius: 1,
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={event.banner_url || `${BACKEND_URL}/storage/${event.banner}`}
                alt={event.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Box>
          )}

          <Typography variant="h4" mb={2}>
            {event.name}
          </Typography>
          <Box display="flex" gap={1} mb={2} alignItems="center">
            <StatusChip value={event.status} />
            <Chip label={event.payment_method} variant="outlined" />
            {event.insurance_active && (
              <Chip label="Insurance Active" color="info" />
            )}
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

          <Box mt={2} mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Event Rules
            </Typography>
            {Array.isArray(event.rules) && event.rules.length > 0 ? (
              <Stack spacing={0.5}>
                {event.rules.map((r, idx) => (
                  <Typography key={idx} variant="body2">
                    • {r.rule_name}
                  </Typography>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No rules for this event
              </Typography>
            )}
          </Box>

          <Typography variant="body2" mb={2}>
            Booth Price: {event.booth_price || "Free"}
          </Typography>

          <Box mt={2} mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Estimated Cost
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">
                Booth: Rp {boothSubtotal.toLocaleString()} {isPerDay && selectedDays ? `( ${selectedDays} hari )` : ""}
              </Typography>
              <Typography variant="body2">Platform Fee: Rp {platformFee.toLocaleString()}</Typography>
              <Typography variant="body2">Insurance: Rp {insuranceFee.toLocaleString()}</Typography>
              <Typography variant="subtitle2">Total: Rp {totalPreview.toLocaleString()}</Typography>
            </Stack>
          </Box>

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
                Dates must be within event range: {event.start_date} to{" "}
                {event.end_date}
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
              <Button variant="contained" color="success" onClick={handleClaim}>
                Claim
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
