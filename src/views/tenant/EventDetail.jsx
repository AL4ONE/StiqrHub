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
  Divider,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import { BACKEND_URL } from "src/config/constants";
import { apiGet, apiPost } from "src/utils/api";
import { useParams } from "react-router-dom";
import { formatDateIndonesia } from "src/utils/dateFormat";

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
const WHATSAPP_NUMBER = "+62 821-1838-3415";
const WHATSAPP_LINK =
  "https://wa.me/6282118383415?text=Halo%20Stiqr%20Hub%2C%20saya%20ingin%20bergabung%20ke%20komunitas%20WA.";
  const toNumber = (v) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return Number.isFinite(n) ? n : 0;
  };
  const fmt = (n) => {
    const num = Math.floor(toNumber(n));
    // Format dengan titik sebagai pemisah ribuan
    const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp ${formatted}`;
  };
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
    const unit = toNumber(event.booth_price);
    return isPerDay ? unit * (selectedDays || 0) : unit;
  })();
  const totalPreview = toNumber(boothSubtotal) + platformFee + insuranceFee;

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
    window.location.href = `/app/tenant/events/${id}/claim`;
  };

  const StatusChip = ({ value }) => {
    const color =
      value === "ACTIVATED"
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
            {formatDateIndonesia(event.start_date)} → {formatDateIndonesia(event.end_date)}
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
            Booth Price: {event.booth_price != null ? fmt(event.booth_price) : "Free"}
          </Typography>

          {/* Bank Accounts */}
          {event.bank_accounts && event.bank_accounts.length > 0 && (
            <Box mt={2} mb={2}>
              <Typography variant="subtitle1" mb={1}>
                Nomor Rekening Pembayaran
              </Typography>
              <Stack spacing={1}>
                {event.bank_accounts.map((account, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      p: 1.5, 
                      border: '1px solid', 
                      borderColor: account.is_default ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      backgroundColor: account.is_default ? 'primary.50' : 'transparent'
                    }}
                  >
                    <Typography variant="body2" fontWeight={account.is_default ? 'bold' : 'normal'}>
                      {account.is_default && <Chip label="Default" size="small" color="primary" sx={{ mr: 1, mb: 0.5 }} />}
                      <strong>{account.bank_name}</strong>
                    </Typography>
                    <Typography variant="body2">
                      {account.account_number}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      a.n. {account.account_name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          <Box mt={2} mb={2}>
            <Typography variant="subtitle1" mb={1}>
              Estimated Cost
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">
                Booth: {fmt(boothSubtotal)} {isPerDay && selectedDays ? `( ${selectedDays} hari )` : ""}
              </Typography>
              <Typography variant="body2">Platform Fee: {fmt(platformFee)}</Typography>
              <Typography variant="body2">Insurance: {fmt(insuranceFee)}</Typography>
              <Typography variant="subtitle2">Total: {fmt(totalPreview)}</Typography>
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
                Dates must be within event range: {formatDateIndonesia(event.start_date)} to{" "}
                {formatDateIndonesia(event.end_date)}
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

          <Divider sx={{ my: 4 }} />
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "primary.light",
              backgroundColor: "primary.50",
            }}
          >
            <Typography variant="h6" mb={0.5}>
              Gabung WhatsApp Stiqr
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Kalau butuh bantuan onboarding atau mau diskusi event, klik tombol
              di bawah untuk join grup WA resmi Stiqr.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component="a"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="success"
              >
                Buka WhatsApp
              </Button>
              <Box>
                <Typography variant="caption" color="textSecondary">
                  Nomor admin Stiqr
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {WHATSAPP_NUMBER}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
