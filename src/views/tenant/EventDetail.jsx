import React, { useEffect, useMemo, useState } from "react";
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
  Grid,
  Paper,
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
const WHATSAPP_PHONE = "6282118383415";
const WHATSAPP_COMMUNITY_LINK =
"https://wa.me/6282118383415?text=Halo%20Stiqr%20Hub%2C%20saya%20ingin%20bergabung%20ke%20komunitas%20WA.";
const buildWhatsAppLink = (eventName = "") => {
  const safeName = eventName ? `${eventName} ` : "";
  const message = encodeURIComponent(
    `Halo, Saya tertarik dengan event ${safeName}STIQRHub bisa diskusi lebih lanjut?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
};
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
  const eventWhatsAppLink = useMemo(() => buildWhatsAppLink(event?.name || ""), [event?.name]);
  const totalTenantCapacity = useMemo(() => {
    const boothCapacity = Number(event?.booth_capacity) || 0;
    const tenantPerBooth = Number(event?.tenant_capacity) || 0;
    if (boothCapacity > 0 && tenantPerBooth > 0) {
      return boothCapacity * tenantPerBooth;
    }
    return boothCapacity || tenantPerBooth || 0;
  }, [event?.booth_capacity, event?.tenant_capacity]);
  const registeredTenants =
    Number(event?.registrations_count ?? (Array.isArray(event?.registrations) ? event.registrations.length : 0)) || 0;
  const remainingTenantCapacity =
    totalTenantCapacity > 0 ? Math.max(totalTenantCapacity - registeredTenants, 0) : 0;
  const totalTenantCapacityLabel = totalTenantCapacity ? `${totalTenantCapacity} tenant` : "-";
  const remainingTenantCapacityLabel = totalTenantCapacity
    ? `${remainingTenantCapacity} tenant`
    : registeredTenants
    ? `${registeredTenants} tenant terdaftar`
    : "-";

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

  const SectionCard = ({ title, subtitle, children, highlight }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: highlight ? "primary.light" : "grey.200",
        backgroundColor: highlight ? "primary.50" : "#fcfcfc",
      }}
    >
      <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={subtitle ? 0.5 : 1}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Paper>
  );

  const InfoRow = ({ label, value, emphasize }) => (
    <Stack spacing={0.5}>
      <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={0.5}>
        {label}
      </Typography>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="body1" fontWeight={emphasize ? 700 : 500} color={emphasize ? "text.primary" : "text.secondary"}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );

  const eventDateRange = useMemo(() => {
    const parse = (date) => {
      if (!date) return null;
      const d = new Date(date);
      if (Number.isNaN(d.getTime())) return null;
      // Return YYYY-MM-DD
      return d.toISOString().split("T")[0];
    };
    return {
      start: parse(event?.start_date),
      end: parse(event?.end_date),
    };
  }, [event?.start_date, event?.end_date]);

  const clampDateToRange = (value) => {
    if (!value) return value;
    const { start, end } = eventDateRange;
    const val = new Date(value);
    if (Number.isNaN(val.getTime())) return value;
    if (start) {
      const min = new Date(start);
      if (val < min) return start;
    }
    if (end) {
      const max = new Date(end);
      if (val > max) return end;
    }
    return value;
  };

  useEffect(() => {
    if (!isPerDay) return;
    if (startDate) {
      setStartDate((prev) => {
        if (!prev) return prev;
        const clamped = clampDateToRange(prev);
        return clamped !== prev ? clamped : prev;
      });
    }
  }, [eventDateRange.start, eventDateRange.end, isPerDay]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isPerDay) return;
    if (endDate) {
      setEndDate((prev) => {
        if (!prev) return prev;
        let clamped = clampDateToRange(prev);
        if (startDate && clamped && new Date(clamped) < new Date(startDate)) {
          clamped = startDate;
        }
        return clamped !== prev ? clamped : prev;
      });
    }
  }, [eventDateRange.start, eventDateRange.end, startDate, isPerDay]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const eventDescription =
    event?.details ||
    event?.description ||
    event?.short_description ||
    event?.detail ||
    "";

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
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={4}>
              <InfoRow label="Lokasi" value={event.location || "-"} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow
                label="Periode Event"
                value={
                  <Stack spacing={0.3}>
                    <Typography variant="body1" fontWeight={700} color="text.primary">
                      Start: {formatDateIndonesia(event.start_date)}
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color="text.primary">
                      End: {formatDateIndonesia(event.end_date)}
                    </Typography>
                  </Stack>
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Kategori" value={event.category || "-"} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Total Kuota Tenant" value={totalTenantCapacityLabel} emphasize />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoRow label="Sisa Slot Tersedia" value={remainingTenantCapacityLabel} emphasize />
            </Grid>
          </Grid>

          <Box mb={3}>
            <SectionCard title="Detail Event" subtitle="Informasi dari EO mengenai event ini">
              {eventDescription ? (
                <Typography variant="body2" color="text.primary" lineHeight={1.7}>
                  {eventDescription}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Belum ada deskripsi yang dibagikan oleh EO.
                </Typography>
              )}
            </SectionCard>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SectionCard title="Informasi Aturan Event" subtitle="Pastikan kamu mengikuti semua ketentuan EO">
                {Array.isArray(event.rules) && event.rules.length > 0 ? (
                  <Stack spacing={0.75}>
                    {event.rules.map((r, idx) => (
                      <Typography key={idx} variant="body2" color="text.primary">
                        • <strong>{r.rule_name}</strong>
                      </Typography>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Tidak ada aturan khusus untuk event ini.
                  </Typography>
                )}
              </SectionCard>

              {event.bank_accounts && event.bank_accounts.length > 0 && (
                <SectionCard
                  title="Rekening Pembayaran"
                  subtitle="Gunakan rekening berikut ketika dihubungi EO"
                >
                  <Stack spacing={1.5}>
                    {event.bank_accounts.map((account, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1.5,
                          borderRadius: 1.5,
                          border: "1px solid",
                          borderColor: account.is_default ? "primary.main" : "grey.300",
                          backgroundColor: account.is_default ? "primary.50" : "grey.50",
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle2">
                            {account.bank_name}
                          </Typography>
                          {account.is_default && (
                            <Chip label="Default" size="small" color="primary" />
                          )}
                        </Stack>
                        <Typography variant="body2" fontWeight={600}>
                          {account.account_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          a.n. {account.account_name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </SectionCard>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              {event.contact_for_price ? (
                <SectionCard
                  title="Hubungi EO untuk Harga"
                  subtitle="Harga booth akan diinformasikan setelah kamu menghubungi EO"
                  highlight
                >
                  <Typography variant="body2" mb={2}>
                    Tekan tombol di bawah ini untuk terhubung langsung via WhatsApp dan mendiskusikan paket harga.
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    component="a"
                    href={eventWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hubungi via WhatsApp
                  </Button>
                </SectionCard>
              ) : (
                <SectionCard title="Estimasi Biaya" subtitle="Simulasi biaya sebelum kamu daftar" highlight>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      Booth <strong>{isPerDay && selectedDays ? `( ${selectedDays} hari )` : ""}</strong>
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontWeight={700} mb={1}>
                      {fmt(boothSubtotal)}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2">Platform Fee: <strong>{fmt(platformFee)}</strong></Typography>
                    <Typography variant="body2">Insurance: <strong>{fmt(insuranceFee)}</strong></Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight={800} color="primary.main">
                      Total Estimasi: {fmt(totalPreview)}
                    </Typography>
                  </Stack>
                </SectionCard>
              )}

              {isPerDay && !hasRegistered && (
                <SectionCard
                  title="Pilih Jadwal Booth"
                  subtitle="Tanggal harus berada dalam rentang event"
                >
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        const value = clampDateToRange(e.target.value);
                        setStartDate(value);
                        if (endDate && value && new Date(value) > new Date(endDate)) {
                          setEndDate(value);
                        }
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: eventDateRange.start || undefined,
                        max: eventDateRange.end || undefined,
                      }}
                      fullWidth
                    />
                    <TextField
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        let value = clampDateToRange(e.target.value);
                        if (startDate && value && new Date(value) < new Date(startDate)) {
                          value = startDate;
                        }
                        setEndDate(value);
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: startDate || eventDateRange.start || undefined,
                        max: eventDateRange.end || undefined,
                      }}
                      fullWidth
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                  </Typography>
                </SectionCard>
              )}
            </Grid>
          </Grid>

          <SectionCard
            title="Action Center"
            subtitle={hasRegistered ? "Kamu sudah terdaftar di event ini" : "Segera amankan slot kamu"}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {!hasRegistered ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={register}
                  disabled={registering || !canRegister}
                >
                  {registering ? "Registering..." : "Daftar Sekarang"}
                </Button>
              ) : (
                <Button variant="contained" color="success" size="large" onClick={handleClaim}>
                  Ajukan Klaim
                </Button>
              )}
              <Button variant="outlined" size="large" color="inherit" onClick={() => window.history.back()}>
                Kembali
              </Button>
            </Stack>
            {event.contact_for_price && (
              <Typography variant="caption" color="text.secondary" mt={1.5} display="block">
                Harga booth akan dikonfirmasi melalui WhatsApp setelah kamu menghubungi EO.
              </Typography>
            )}
          </SectionCard>

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
                href={WHATSAPP_COMMUNITY_LINK}
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
